const db = require("../../db/db.js");

/**
 * O'qituvchi ma'lumotlari va kurslari
 * @param {number} teacherId
 */
exports.getPublicTeacherAccountService = async (teacherId) => {
  const teacher = await db("users")
    .where({ id: teacherId, type: 1 })
    .first();

  if (!teacher) {
    throw new Error("Teacher not found or invalid teacher ID");
  }

  // Get the number of students subscribed to the teacher
  const subscribedStudentsCount = await db('subscriptions')
    .where({ teacher_id: teacherId })
    .count('student_id as count')
    .first();

  return {
    ...teacher,
    subscribedStudentsCount: subscribedStudentsCount.count
  };
};

exports.getPublicTeachersAccountService = async () => {
  // O'qituvchi haqida asosiy ma'lumot
  const teachers = await db("users")
    .where({ type: 1 })
    .leftJoin("teacher_more_date", "users.id", "teacher_more_date.user_id")
    .select("users.id", "users.first_name", "users.last_name", "users.email", "users.profile_img", "teacher_more_date.spiceal");

  // Har bir o'qituvchi uchun obuna bo'lgan studentlar sonini olish
  const teachersWithSubscriptionCount = await Promise.all(
    teachers.map(async (teacher) => {
      const subscribedStudentsCount = await db('subscriptions')
        .where({ teacher_id: teacher.id })
        .count('student_id as count')
        .first();
      return {
        ...teacher,
        subscribedStudentsCount: subscribedStudentsCount.count
      };
    })
  );

  // Ma'lumotlarni birlashtirib qaytarish
  return {
    teachers: teachersWithSubscriptionCount
  };
};
