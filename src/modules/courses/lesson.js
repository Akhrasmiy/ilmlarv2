const db = require("../../db/db.js");

exports.getlesson = async (userId, lessonId) => {
    const lesson = await db("courses_videos")
        .where("id", lessonId)
        .select("courses_videos.*")
        .first();

    if (!lesson) {
        throw new Error("Kurs topilmadi.");
    }

    const course = await db("courses")
        .where("id", lesson.course_id)
        .select("courses.*")
        .first();

    if (!course) {
        throw new Error("Kurs topilmadi.");
    }

    let course_users = null;
    if (userId) {
        course_users = await db("course_users")
            .where("course_id", lesson.course_id)
            .andWhere("user_id", userId)
            .select("*")
            .first();
    }

    course.is_purchased = !!course_users; // `!!` bilan boolean qiymatga o'girish

    const videos = await db("courses_videos")
        .where({ id: lessonId })
        .select(
            "id",
            "title",
            "description",
            "is_free",
            db.raw(`
                CASE 
                  WHEN is_free = true THEN video_link
                  WHEN is_free = false AND ? = true THEN video_link
                  ELSE NULL
                END AS video_link
            `, [course.is_purchased]),
            db.raw(`
                CASE 
                  WHEN is_free = true THEN file
                  WHEN is_free = false AND ? = true THEN file
                  ELSE NULL
                END AS file
            `, [course.is_purchased])
        )
        .first();

    return videos;
};


exports.getLessonForTeacher = async (teacherId, lessonId) => {
    try {
        const lesson = await db("courses_videos")
          .join("courses", "courses.id", "courses_videos.course_id")
          .where({ "courses.teacher_id": teacherId, "courses_videos.id": lessonId })
          .select(
            "courses_videos.id",
            "courses_videos.course_id",
            "courses_videos.title",
            "courses_videos.description",
            "courses_videos.video_link",
            "courses_videos.is_free",
            "courses.name as course_name",
            "courses.discription as course_description"
          )
          .first();
    
        if (!lesson) {
          throw new Error("Lesson not found or you do not have permission to view this lesson.");
        }
    
        return lesson;
      } catch (error) {
        console.error('Error fetching lesson details for teacher:', error);
        throw new Error('Error fetching lesson details for teacher.');
      }
};