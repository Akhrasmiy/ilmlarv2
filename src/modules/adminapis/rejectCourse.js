const db = require("../../db/db.js");

exports.rejectCourse = async (courseId, reason) => {
    const updated = await db("courses")
        .where("id", courseId)
        .update({ is_verified: false, rejected_reason: reason || null });

    if (!updated) throw new Error("Kurs topilmadi");
    return { message: "Kurs rad etildi" };
};
