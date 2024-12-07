const db = require("../../db/db.js");

/**
 * O'qituvchi ma'lumotlari va kurslari
 * @param {number} teacherId
 */
exports.getPublicTeacherAccountService = async (teacherId) => {
  // O'qituvchi haqida asosiy ma'lumot
  const teacher = await db("users")
    .where({ id: teacherId, type: "teacher" })
    .select("id", "first_name", "last_name", "email")
    .first();

  if (!teacher) {
    throw new Error("O'qituvchi topilmadi.");
  }

  // O'qituvchining kurslari
  const courses = await db("courses")
    .where({ teacher_id: teacherId })
    .select("id");

  // Ma'lumotlarni birlashtirib qaytarish
  return {
    ...teacher,
    courses,
  };
};
