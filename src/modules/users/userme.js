const { BadRequestError, NotFoundError } = require("../../shared/errors");
const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi

// Foydalanuvchini tasdiqlash funksiyasi
const userme = async (data) => {
    // Foydalanuvchini topish
    const user = await db("users")
        .where({ id: data })
        .first();
    const amount = await db('transactions')
        .where({ user_id:data })
        .select(db.raw('SUM(credit) - SUM(debit) AS balance'))
        .first();
    const transactions_history = await db('transactions')
        .where({ user_id:data }).orderBy("transactions.id",'desc')
        .select("*")


    return {...user,amount,transactions_history };
};



module.exports = userme;
