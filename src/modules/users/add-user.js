const { hash } = require("bcryptjs");
const sendEmail = require("../../nodemeiler");
const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi

const addUser = async (data) => {
  return db.transaction(async (trx) => {
    // Foydalanuvchi mavjudligini tekshirish
    const existingUser = await trx("users")
      .where({ user_name: data.username }) // username o'rniga user_name ishlatiladi
      .orWhere({ email: data.email })
      .andWhere({ is_verified: true })
      .first();

    if (existingUser) {
      throw new Error("Bu foydalanuvchi allaqachon mavjud.");
    }

    // Tasdiqlanmagan foydalanuvchilarni o'chirish
    await trx("users")
      .where({ user_name: data.username, is_verified: false })
      .orWhere({ email: data.email, is_verified: false })
      .del();

    // Parolni xeshlash
    const hashedPassword = await hash(data.password, 10);

    // Tasdiqlash kodini yuborish
    await sendEmail(data.email, data.code);

    // `type` jadvalidan `teacher` va `student` uchun ID-ni olish
    const typeRecord = await trx("type")
      .where({ name: data.type })
      .select("id")
      .first();

    if (!typeRecord) {
      throw new Error("Type noto'g'ri.");
    }

    // Yangi foydalanuvchini qo'shish va ID ni olish
    const [userId] = await trx("users")
      .insert({
        first_name: data.first_name,
        last_name: data.last_name,
        user_name: data.username, // username o'rniga user_name ishlatiladi
        password: hashedPassword,
        email: data.email,
        is_verified: false,
        created_at: new Date(),
        last_login_at: null,
        type: typeRecord.id, // `type` bo'yicha ID
        payment_id: data.payment_id || null,
      })
      .returning("id"); // ID ni qaytarish

    console.log("Yaratilgan foydalanuvchi ID:", userId);

    // Agar o'qituvchi bo'lsa, `teacher_more_date` jadvaliga qo'shish
    if (data.type === "teacher") {
      await trx("teacher_more_date").insert({
        user_id: userId.id,
        spiceal: data.specialization || null,
        link: data.link || null,
        status: 1, // Default status
        info: data.info || null,
      });
    }

    // Tasdiqlash kodini `confirmation_code` jadvaliga qo'shish
    await trx("confirmation_code").insert({
      user_id: userId.id,
      code: data.code,
      created_at: new Date(), // `created_date` o'rniga `created_at` ishlatiladi
    });

    return { email: data.email }; // Transaction muvaffaqiyatli tugadi
  });
};

module.exports = addUser;
