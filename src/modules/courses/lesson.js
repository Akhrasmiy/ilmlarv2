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
    const course_users = await db("course_users")
        .where("course_id", lesson.course_id)
        .andWhere("user_id", userId)
        .select("*")
        .first();
    if (course_users) {
        course.is_purchased = true;
    } else course.is_purchased = false;
    let returing_videos = null
    if (course.is_purchased) {
        const videos = await db("courses_videos")
            .where({ id: lessonId })
            .select(
                "id",
                "title",
                "description",
                "is_free",
                "video_link",
                "file",
            ).first();

        returing_videos = videos;
    }
    else {
        const videos = await db("courses_videos")
            .where({ id: lessonId })
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
            ).first();

        returing_videos = videos;
    }


    return returing_videos;
};