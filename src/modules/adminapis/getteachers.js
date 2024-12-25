const db = require("../../db/db.js");

// 1. Saqlangan kurslarni olish
exports.getTeachersservise = async () => {
  try {
    // Step 1: Fetch all teachers with their additional data and status
    const teachers = await db("users")
      .join("teacher_more_date", "users.id", "=", "teacher_more_date.user_id")
      .join("teacher_status", "teacher_more_date.status", "=", "teacher_status.id")
      .select(
        "users.id as teacher_id",
        "users.first_name",
        "users.last_name",
        "users.email",
        "teacher_more_date.spiceal as speciality",
        "teacher_more_date.link",
        "teacher_more_date.info",
        "teacher_status.name as status_name"
      )
      .where("users.type", 1); // type: 1 indicates teacher

    // Step 2: For each teacher, fetch their courses and transactions
    const result = await Promise.all(
      teachers.map(async (teacher) => {
        // Fetch courses for the teacher
        const courses = await db("courses")
          .select(
            "id as course_id",
            "name as course_name",
            "discription",
            "trieler",
            "obloshka",
            "price",
            "is_verified",
            "created_at"
          )
          .where("teacher_id", teacher.teacher_id); // Use teacher.teacher_id here

        // Fetch transactions for the teacher and calculate total debit/credit
        const transactions = await db("transactions")
          .select("debit", "credit")
          .where("user_id", teacher.teacher_id); // Use teacher.teacher_id here

        const totalDebit = transactions.reduce((sum, txn) => sum + txn.debit, 0);
        const totalCredit = transactions.reduce((sum, txn) => sum + txn.credit, 0);

        // Combine all data
        return {
          teacher_id: teacher.teacher_id,
          first_name: teacher.first_name,
          last_name: teacher.last_name,
          email: teacher.email,
          speciality: teacher.speciality,
          link: teacher.link,
          info: teacher.info,
          status_name: teacher.status_name,
          totalDebit,
          totalCredit,
          balance:   totalCredit-totalDebit,
          courses,
        };
      })
    );

    return result;
  } catch (error) {
    console.error("Error fetching teachers with details:", error);
    throw new Error("Could not fetch teachers with details.");
  }
};
