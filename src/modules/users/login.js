const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../shared/config/index.js');
const { NotFoundError, UnauthorizedError } = require('../../shared/errors');
const db = require('../../db/db.js'); // Knex konfiguratsiyasi import qilinadi

const signInUser = async (data) => {
  // Foydalanuvchini topish (username yoki email bo'yicha)
  const existing = await db("users")
    .where(function () {
      this.where({ user_name: data.username }).orWhere({ email: data.username });
    })
    .andWhere({ is_verified: true })
    .first();

  if (!existing) {
    throw new NotFoundError('Foydalanuvchi topilmadi.');
  }

  // Parolni tekshirish
  const match = await bcryptjs.compare(data.password, existing.password);

  if (!match) {
    throw new UnauthorizedError('Login yoki parol xato.');
  }

  // JWT token yaratish
  const token = jwt.sign({ user: { id: existing.id } }, config.jwt.secret, {
    expiresIn: "1h", // Tokenning amal qilish muddati
  });

  return { token };
};

module.exports = signInUser;
