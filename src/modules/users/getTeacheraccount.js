const db = require("../../db/db.js");

/**
 * O'qituvchi ma'lumotlari va kurslari
 * @param {number} teacherId
 */
exports.getPublicTeacherAccountService = async (teacherId) => {
  // O'qituvchi haqida asosiy ma'lumot
  const teacher = await db("users")
  .where({ "users.id": teacherId, "users.type": 1 })
    .leftJoin("teacher_more_date", "users.id", "teacher_more_date.user_id")
    .select("users.id","users.type", "users.first_name", "users.last_name", "users.email", "users.profile_img","teacher_more_date.spiceal")
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

exports.getPublicTeachersAccountService = async () => {
  // O'qituvchi haqida asosiy ma'lumot
  const teachers = await db("users")
    .where({ type: 1 })
    .leftJoin("teacher_more_date", "users.id", "teacher_more_date.user_id")
    .select("users.id", "users.first_name", "users.last_name", "users.email", "users.profile_img", "teacher_more_date.spiceal")



  // Ma'lumotlarni birlashtirib qaytarish
  return {
    teachers
  };
};
