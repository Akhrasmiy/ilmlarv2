const db = require("../../db/db.js");

exports.getEnrollments = async ({ page, limit, course_id, user_id }) => {
    const offset = (page - 1) * limit;

    let query = db("course_users")
        .join("users", "course_users.user_id", "users.id")
        .join("courses", "course_users.course_id", "courses.id")
        .leftJoin("course_buy_status as cbs", "course_users.status", "cbs.id")
        .select(
            "course_users.id",
            "course_users.start_date",
            "course_users.end_date",
            "users.id as user_id",
            "users.first_name",
            "users.last_name",
            "users.email",
            "courses.id as course_id",
            "courses.name as course_name",
            "courses.price",
            "cbs.name as status"
        );

    if (course_id) query = query.where("course_users.course_id", course_id);
    if (user_id) query = query.where("course_users.user_id", user_id);

    const [data, totalResult] = await Promise.all([
        query.clone().orderBy("course_users.start_date", "desc").limit(limit).offset(offset),
        query.clone().count("course_users.id as count").first(),
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total: Number(totalResult.count),
            pages: Math.ceil(Number(totalResult.count) / limit),
        },
    };
};

exports.createTestEnrollment = async ({ user_id, course_id, note, admin_id }) => {
    const user = await db("users").where("id", user_id).first();
    if (!user) throw new Error("Foydalanuvchi topilmadi");

    const course = await db("courses").where("id", course_id).first();
    if (!course) throw new Error("Kurs topilmadi");

    // course_buy_status dan birinchi statusni olish (odatda 1 = faol)
    const status = await db("course_buy_status").orderBy("id").first();
    if (!status) throw new Error("course_buy_status jadvali bo'sh");

    // Agar allaqachon ro'yxatdan o'tgan bo'lsa
    const existing = await db("course_users")
        .where({ user_id, course_id })
        .first();

    if (existing) throw new Error("Foydalanuvchi bu kursga allaqachon yozilgan");

    const [enrollment] = await db("course_users")
        .insert({
            user_id,
            course_id,
            status: status.id,
            start_date: new Date(),
        })
        .returning("*");

    // Test enrollment log
    await db("test_enrollments").insert({
        user_id,
        course_id,
        note: note || null,
        created_by: admin_id,
    }).onConflict(["user_id", "course_id"]).ignore();

    return { message: "Test enrollment yaratildi", enrollment };
};

exports.deleteEnrollment = async (id) => {
    const deleted = await db("course_users").where("id", id).delete();
    if (!deleted) throw new Error("Enrollment topilmadi");
    return { message: "Enrollment o'chirildi" };
};

exports.getTestEnrollments = async ({ page, limit }) => {
    const offset = (page - 1) * limit;

    const [data, totalResult] = await Promise.all([
        db("test_enrollments")
            .join("users as u", "test_enrollments.user_id", "u.id")
            .join("courses as c", "test_enrollments.course_id", "c.id")
            .leftJoin("users as a", "test_enrollments.created_by", "a.id")
            .select(
                "test_enrollments.id",
                "test_enrollments.note",
                "test_enrollments.created_at",
                "u.id as user_id",
                "u.first_name",
                "u.last_name",
                "u.email",
                "c.id as course_id",
                "c.name as course_name",
                "a.first_name as admin_first_name",
                "a.last_name as admin_last_name"
            )
            .orderBy("test_enrollments.created_at", "desc")
            .limit(limit)
            .offset(offset),
        db("test_enrollments").count("id as count").first(),
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total: Number(totalResult.count),
            pages: Math.ceil(Number(totalResult.count) / limit),
        },
    };
};
