const db = require("../../db/db.js");

exports.getTransactions = async ({ page, limit, user_id, is_internal }) => {
    const offset = (page - 1) * limit;

    let query = db("transactions")
        .leftJoin("users", "transactions.user_id", "users.id")
        .select(
            "transactions.id",
            "transactions.debit",
            "transactions.credit",
            "transactions.comment",
            "transactions.is_internal",
            "transactions.created_at",
            "users.id as user_id",
            "users.first_name",
            "users.last_name",
            "users.email"
        );

    if (user_id !== null) query = query.where("transactions.user_id", user_id);
    if (is_internal !== null) query = query.where("transactions.is_internal", is_internal);

    const [data, totalResult, sumResult] = await Promise.all([
        query.clone().orderBy("transactions.created_at", "desc").limit(limit).offset(offset),
        query.clone().count("transactions.id as count").first(),
        db("transactions").sum("credit as total_credit").sum("debit as total_debit").first(),
    ]);

    return {
        data,
        summary: {
            total_credit: Number(sumResult.total_credit) || 0,
            total_debit: Number(sumResult.total_debit) || 0,
            net: (Number(sumResult.total_credit) || 0) - (Number(sumResult.total_debit) || 0),
        },
        pagination: {
            page,
            limit,
            total: Number(totalResult.count),
            pages: Math.ceil(Number(totalResult.count) / limit),
        },
    };
};
