const db = require("../../db/db.js");

exports.completeCourseService = async (data, teacherId) => {
    const course = await db("courses")
        .where({ id: data.course_id, teacher_id: teacherId })
        .first();

    if (!course) {
        throw new Error("Kurs mavjud emas yoki bu amalni bajarish huquqiga ega emassiz.");
    }

    await db("courses").where({ id: data.course_id }).update({ status: 2 });
};