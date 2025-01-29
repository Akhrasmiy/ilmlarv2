const { BadRequestError, NotFoundError } = require("../../shared/errors");
const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi

// Foydalanuvchini tasdiqlash funksiyasi
const userme = async (data) => {
    // Foydalanuvchini topish
    const user = await db("users")
        .where({ id: data })
        .first();
    const amount = await db('transactions')
        .where({ user_id: data })
        .select(db.raw('SUM(credit) - SUM(debit) AS balance'))
        .first();
    const transactions_history = await db('transactions')
        .where({ user_id: data }).orderBy("transactions.id", 'desc')
        .select("*");

    // Obuna bo'lgan teacherlarni olish
    const subscribedTeachers = await db('subscriptions')
        .where({ student_id: data })
        .pluck('teacher_id');

    return { ...user, amount, transactions_history, subscribedTeachers };
};

module.exports = userme;
