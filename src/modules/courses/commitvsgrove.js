const db = require("../../db/db.js");

// Izoh qo'shish
exports.addCommitService = async (userId, courseId, text) => {
  // Tekshiruv: Foydalanuvchi kursni sotib olganmi?
  const purchased = await db("course_users")
    .where({ user_id: userId, course_id: courseId })
    .first();

  if (!purchased) {
    throw new Error("Siz bu kursni sotib olmadingiz, izoh qo'sha olmaysiz.");
  }

  // Izohni qo'shish
  const [newCommit] = await db("course_commit")
    .insert({
      user_id: userId,
      course_id: courseId,
      txt:text,
    })
    .returning(["id", "course_id", "user_id", "txt"]);

  return newCommit;
};

// Baho qo'shish
exports.addScoreService = async (userId, courseId, score) => {
    // Tekshiruv: Foydalanuvchi kursni sotib olganmi?
    const purchased = await db("course_users")
      .where({ user_id: userId, course_id: courseId })
      .first();
  
    if (!purchased) {
      throw new Error("Siz bu kursni sotib olmadingiz, baho qo'sha olmaysiz.");
    }
  
    // Tekshiruv: Foydalanuvchi baho qo'shganmi?
    const existingScore = await db("course_score")
      .where({ user_id: userId, course_id: courseId })
      .first();
  
    if (existingScore) {
      // Eski bahoni o'chirish
      await db("course_score")
        .where({ user_id: userId, course_id: courseId })
        .del();
    }
  
    // Yangi baho qo'shish
    const [newScore] = await db("course_score")
      .insert({
        user_id: userId,
        course_id: courseId,
        score,
      })
      .returning(["id", "course_id", "user_id", "score"]);
  
    return newScore;
  };
  