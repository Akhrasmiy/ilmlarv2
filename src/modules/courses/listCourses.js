const db = require("../../db/db.js");

const getCoursesService = async (userId, userRole, filters) => {
  const query = db("courses")
    .select(
      "courses.*",
      db.raw(`
        CASE 
          WHEN price = 0 THEN true
          ELSE false
        END AS is_free
      `) // Dynamically calculate is_free based on price
    );

  // Apply teacher filter
  if (filters.teacherIds.length > 0) {
    query.whereIn("teacher_id", filters.teacherIds);
  }

  // Apply category filter
  if (filters.categories.length > 0) {
    query.whereIn("category", filters.categories);
  }

  // Apply period filter
  if (filters.periods.length > 0) {
    query.whereIn("period", filters.periods);
  }

  // Apply language filter
  if (filters.languages.length > 0) {
    query.whereIn("language", filters.languages);
  }

  // Apply "free or paid" filter
  if (filters.isFree !== null) {
    query.whereRaw(`price ${filters.isFree ? "= 0" : "> 0"}`);
  }

  // Apply search filter
  if (filters.search) {
    query.where((builder) =>
      builder
        .where("name", "like", `%${filters.search}%`)
        .orWhere("discription", "like", `%${filters.search}%`)
    );
  }

  return await query;
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
  .join("users", "users.id", "course_commit.user_id")
    .where({ course_id: courseId })
    .select("course_commit.id", "course_commit.user_id", "course_commit.txt", "users.first_name","users.last_name","users.profile_img");

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
  .join("users", "users.id", "course_commit.user_id")
    .where({ course_id: courseId })
    .select("course_commit.id", "course_commit.user_id", "course_commit.txt", "users.first_name","users.last_name","users.profile_img");

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
