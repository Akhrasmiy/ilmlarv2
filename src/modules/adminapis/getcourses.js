const db = require("../../db/db.js");


exports.getCoursesService = async () => {
  try {
    // Fetch all courses with their details
    const courses = await db("courses")
      .select(
        "courses.id as course_id",
        "courses.name as course_name",
        "courses.discription",
        "courses.trieler",
        "courses.obloshka",
        "courses.price",
        "courses.is_verified",
        "courses.created_at",
        "users.id as teacher_id",
        "users.first_name as teacher_first_name",
        "users.last_name as teacher_last_name"
      )
      .join("users", "courses.teacher_id", "=", "users.id");

    // Fetch additional stats (average score, sold count, and current learners) for each course
    const result = await Promise.all(
      courses.map(async (course) => {
        // Calculate average score
        const avgScoreResult = await db("course_score")
          .where("course_id", course.course_id)
          .avg("score as average_score")
          .first();
        const averageScore = Number(avgScoreResult?.average_score) || 0;

        // Count number of sales
        const soldCountResult = await db("course_users")
          .where("course_id", course.course_id)
          .count("id as sold_count")
          .first();
        const soldCount = Number(soldCountResult?.sold_count) || 0;

        // Count number of current learners
        const currentLearnersResult = await db("course_users")
          .where("course_id", course.course_id)
          .whereNull("end_date") // Learners still active
          .count("id as current_learners")
          .first();
        const currentLearners = Number(currentLearnersResult?.current_learners) || 0;

        return {
          ...course,
          average_score: Number(averageScore.toFixed(2)), // Rounded to 2 decimal places
          sold_count: soldCount,
          current_learners: currentLearners,
        };
      })
    );

    return result;
  } catch (error) {
    console.error("Error fetching courses with details:", error);
    throw new Error("Could not fetch courses with details.");
  }
};
