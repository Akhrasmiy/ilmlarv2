const { BadRequestError, NotFoundError } = require("../../shared/errors");
const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi

// Foydalanuvchini tasdiqlash funksiyasi
const verified = async (data) => {
  // Foydalanuvchini topish
  const user = await db("users")
    .where({ email: data.email, is_verified: false })
    .first();

  if (!user) {
    throw new NotFoundError("Bunday foydalanuvchi mavjud emas.");
  }

  // Tasdiqlash kodini olish
  const confirmation = await db("confirmation_code")
    .where({ user_id: user.id })
    .first();

  if (!confirmation || confirmation.code !== data.password) {
    throw new BadRequestError("Tasdiqlash kodi noto'g'ri.");
  }

  // Tasdiqlash kodi muddati o'tganligini tekshirish
  const timeDiff = Date.now() - new Date(confirmation.created_at);
  if (timeDiff / 1000 / 60 > 3) {
    await db("confirmation_code").where({ user_id: user.id }).del();
    throw new BadRequestError("Tasdiqlash kodi muddati o'tib ketdi.");
  }

  // Foydalanuvchini tasdiqlash
  await db("users").where({ id: user.id }).update({ is_verified: true });

  // Tasdiqlash kodini o'chirish
  await db("confirmation_code").where({ user_id: user.id }).del();

  return { email: user.email, is_verified: true };
};



module.exports = verified;
