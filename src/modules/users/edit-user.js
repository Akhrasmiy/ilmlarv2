const db = require("../../db/db.js"); // Knex konfiguratsiyasi

/**
 * Foydalanuvchi ma'lumotlarini yangilash
 * @param {number} userId
 * @param {Object} data
 * @returns {Object} Yangilangan foydalanuvchi
 */
const editUser = async (userId, data) => {
  console.log(userId, data);
  const user = await db("users")
    .where({ id: userId })
    .first();
  if (!user) {
    throw new Error("Foydalanuvchi topilmadi.");
  }
  // Foydalanuvchi nomi va emailni tekshirish
  const existingUserName = await db("users")
    .where("user_name", data.user_name)
    .andWhere("id", "!=", userId)
    .first();

  if (existingUserName) {
    throw new Error("Foydalanuvchi nomi allaqachon band.");
  }

  const existingEmail = await db("users")
    .where("email", data.email)
    .andWhere("id", "!=", userId)
    .first();

  if (existingEmail) {
    throw new Error("Email allaqachon band.");
  }

  // Foydalanuvchini yangilash
  const [updatedUser] = await db("users")
    .where({ id: userId })
    .update(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        user_name: data.user_name,
        email: data.email,
      },
      ["id", "first_name", "last_name", "user_name", "email"]
    );

  // If the user is a teacher, update the teacher_more_date table
  if ((data.specialization || data.link || data.phone || data.info) && user.type === 1) {
    await db("teacher_more_date")
      .where({ user_id: userId })
      .update({
        spiceal: data.specialization,
        link: data.link,
        phone: data.phone,
        info: data.info,
      });
  }

  return updatedUser;
};

module.exports = editUser;
