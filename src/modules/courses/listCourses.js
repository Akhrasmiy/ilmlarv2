const db = require("../../db/db.js");

exports.getCoursesService = async (userId, userRole) => {
  if (userRole === 1) {
    // O'qituvchi uchun faqat o'z kurslarini olish va o'rtacha reytingni hisoblash
    return await db("courses")
      .leftJoin("course_score", "courses.id", "course_score.course_id")
      .where({ "courses.teacher_id": userId })
      .groupBy("courses.id")
      .select(
        "courses.*",
        db.raw("COALESCE(AVG(course_score.score), 0) as average_score")
      );
  } else {
    // Talaba uchun barcha kurslarni olish va o'rtacha reytingni hisoblash
    return await db("courses")
      .leftJoin("course_score", "courses.id", "course_score.course_id")
      .groupBy("courses.id")
      .where({ "courses.is_verified": true })
      .select(
        "courses.*",
        db.raw("COALESCE(AVG(course_score.score), 0) as average_score")
      );
  }
};

// 1. Saqlangan kurslarni olish
exports.getSavedCoursesService = async (userId) => {
  return await db("save_courses")
    .join("courses", "save_courses.course_id", "courses.id")
    .where({ "save_courses.user_id": userId })
    .select("courses.*");
};

// 2. Sotib olingan kurslarni olish
exports.getPurchasedCoursesService = async (userId) => {
  return await db("course_users")
    .join("courses", "course_users.course_id", "courses.id")
    .where({ "course_users.user_id": userId })
    .select("courses.*");
};

// 3. Kurs detallari (sotib olingan yoki olinmagan)
exports.getCourseDetailsService = async (userId, courseId) => {
  const course = await db("courses")
    .where("courses.id", courseId)
    .select("courses.*")
    .first();
  if (!course) {
    throw new Error("Kurs topilmadi.");
  }
  const course_users = await db("course_users")
    .where("course_id", courseId)
    .andWhere("user_id", userId)
    .select("*")
    .first();
  if (course_users) {
    course.is_purchased = true;
  } else course.is_purchased = false;

  // 1. Kursning o‘rtacha bahosini hisoblash
  const averageScore = await db("course_score")
    .where({ course_id: courseId })
    .avg("score as average_score")
    .first();

  course.average_score = averageScore?.average_score || 0;

  // 2. `course_study_party` larni olish
  const studyParties = await db("course_study_party")
    .where({ course_id: courseId })
    .select("id", "name");

  course.study_parties = studyParties;

  // 3. `course_commit` larni olish
  const commits = await db("course_commit")
    .where({ course_id: courseId })
    .select("id", "user_id", "txt");

  course.commits = commits;

  // 4. Sotib olinganlar sonini hisoblash
  const purchasedCount = await db("course_users")
    .where({ course_id: courseId })
    .count("id as count")
    .first();

  course.purchased_count = purchasedCount?.count || 0;

  // 5. Saqlangan kurslar sonini hisoblash
  const savedCount = await db("save_courses")
    .where({ course_id: courseId })
    .count("id as count")
    .first();

  course.saved_count = savedCount?.count || 0;

  // 6. Hozirda kursni o‘qiyotganlar soni
  const activeUsersCount = await db("course_users")
    .where({ course_id: courseId })
    .andWhere("end_date", ">", new Date())
    .count("id as count")
    .first();

  course.active_users = activeUsersCount?.count || 0;

  // 7. Kursning videolarini olish
  const videos = await db("courses_videos")
    .where({ course_id: courseId })
    .select(
      "id",
      "title",
      "description",
      "is_free",
      db.raw(
        `
      CASE 
        WHEN is_free = true THEN video_link
        WHEN is_free = false AND ? = true THEN video_link
        ELSE NULL
      END AS video_link
    `,
        [course.is_purchased]
      ), // Sotib olinganlikni tekshirish
      db.raw(
        `
      CASE 
        WHEN is_free = true THEN file
        WHEN is_free = false AND ? = true THEN file
        ELSE NULL
      END AS file
    `,
        [course.is_purchased]
      ) // Sotib olinganlikni tekshirish
    );

  course.videos = videos;

  return course;
};
// 3. Kurs detallari (sotib olingan yoki olinmagan)
exports.getCourseDetailsServicewithoutToken = async (courseId) => {
  const course = await db("courses")
    .where("courses.id", courseId)
    .select("courses.*")
    .first();

  if (!course) {
    throw new Error("Kurs topilmadi.");
  }

  // 1. Kursning o‘rtacha bahosini hisoblash
  const averageScore = await db("course_score")
    .where({ course_id: courseId })
    .avg("score as average_score")
    .first();

  course.average_score = averageScore?.average_score || 0;

  // 2. `course_study_party` larni olish
  const studyParties = await db("course_study_party")
    .where({ course_id: courseId })
    .select("id", "name");

  course.study_parties = studyParties;

  // 3. `course_commit` larni olish
  const commits = await db("course_commit")
    .where({ course_id: courseId })
    .select("id", "user_id", "txt");

  course.commits = commits;

  // 4. Sotib olinganlar sonini hisoblash
  const purchasedCount = await db("course_users")
    .where({ course_id: courseId })
    .count("id as count")
    .first();

  course.purchased_count = purchasedCount?.count || 0;

  // 5. Saqlangan kurslar sonini hisoblash
  const savedCount = await db("save_courses")
    .where({ course_id: courseId })
    .count("id as count")
    .first();

  course.saved_count = savedCount?.count || 0;

  // 6. Hozirda kursni o‘qiyotganlar soni
  const activeUsersCount = await db("course_users")
    .where({ course_id: courseId })
    .andWhere("end_date", ">", new Date())
    .count("id as count")
    .first();

  course.active_users = activeUsersCount?.count || 0;

  // 7. Kursning videolarini olish
  const videos = await db("courses_videos")
    .where({ course_id: courseId })
    .select(
      "id",
      "title",
      "description",
      "is_free",
      db.raw(`
      CASE 
        WHEN is_free = true THEN video_link
        ELSE NULL
      END AS video_link
    `), // Video URL faqat is_free = true bo'lsa ko'rinadi
      db.raw(`
      CASE 
        WHEN is_free = true THEN file
        ELSE NULL
      END AS file
    `) // Fayl faqat is_free = true bo'lsa ko'rinadi
    );

  course.videos = videos;

  return course;
};

exports.getCoursecardDetailsService = async (userId, courseId) => {
  const course = await db("courses")
    .where({ "courses.id": courseId })
    .select(
      "courses.*",
      db.raw(
        "CASE WHEN course_users.id IS NOT NULL THEN TRUE ELSE FALSE END AS is_purchased"
      )
    )
    .first();
  // 1. Kursning o‘rtacha bahosini hisoblash
  const averageScore = await db("course_score")
    .where({ course_id: courseId })
    .avg("score as average_score")
    .first();

  course.average_score = averageScore?.average_score || 0;

  // 3. `course_commit` larni olish
  const commits = await db("course_commit")
    .where({ course_id: courseId })
    .select("id", "user_id", "txt");

  course.commits = commits;

  // 4. Sotib olinganlar sonini hisoblash
  const purchasedCount = await db("course_users")
    .where({ course_id: courseId })
    .count("id as count")
    .first();

  course.purchased_count = purchasedCount?.count || 0;

  return course;
};
