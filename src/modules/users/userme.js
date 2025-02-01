const { BadRequestError, NotFoundError } = require("../../shared/errors");
const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi

// Foydalanuvchini tasdiqlash funksiyasi
const userme = async (data) => {
    // Foydalanuvchini topish
    const user = await db("users")
        .where({ id: data })
        .first();

    if (!user) {
        throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

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

    let teacherMoreData = {};
    if (user.type === 1) {
        teacherMoreData = await db('teacher_more_date')
            .where({ user_id: data })
            .first();
    }

    return { ...user, amount, transactions_history, subscribedTeachers, teacherMoreData };
};

module.exports = userme;
