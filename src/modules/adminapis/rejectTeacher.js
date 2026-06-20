const db = require("../../db/db.js");

exports.rejectTeacher = async (teacherId, reason) => {
    const updated = await db("teacher_more_date")
        .where("user_id", teacherId)
        .update({ status: 3, rejected_reason: reason || null });

    if (!updated) throw new Error("O'qituvchi topilmadi");
    return { message: "O'qituvchi rad etildi" };
};
