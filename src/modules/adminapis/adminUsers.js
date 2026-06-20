const db = require("../../db/db.js");

exports.getUsers = async ({ page, limit, search, type, is_blocked }) => {
    const offset = (page - 1) * limit;

    let query = db("users")
        .leftJoin("type as t", "users.type", "t.id")
        .select(
            "users.id",
            "users.first_name",
            "users.last_name",
            "users.email",
            "users.user_name",
            "users.is_verified",
            "users.is_blocked",
            "users.created_at",
            "t.name as type_name"
        );

    if (search) {
        query = query.where((builder) => {
            builder
                .whereILike("users.first_name", `%${search}%`)
                .orWhereILike("users.last_name", `%${search}%`)
                .orWhereILike("users.email", `%${search}%`);
        });
    }

    if (type !== null) query = query.where("users.type", type);
    if (is_blocked !== null) query = query.where("users.is_blocked", is_blocked);

    const [data, totalResult] = await Promise.all([
        query.clone().orderBy("users.created_at", "desc").limit(limit).offset(offset),
        query.clone().count("users.id as count").first(),
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

exports.getUserById = async (id) => {
    const user = await db("users")
        .leftJoin("type as t", "users.type", "t.id")
        .leftJoin("teacher_more_date as tmd", "users.id", "tmd.user_id")
        .select(
            "users.id",
            "users.first_name",
            "users.last_name",
            "users.email",
            "users.user_name",
            "users.is_verified",
            "users.is_blocked",
            "users.profile_img",
            "users.created_at",
            "users.last_login_at",
            "t.name as type_name",
            "tmd.spiceal as speciality",
            "tmd.phone",
            "tmd.info"
        )
        .where("users.id", id)
        .first();

    if (!user) throw new Error("Foydalanuvchi topilmadi");

    const [enrollments, courses] = await Promise.all([
        db("course_users")
            .join("courses", "course_users.course_id", "courses.id")
            .select("courses.id", "courses.name", "course_users.start_date", "course_users.end_date")
            .where("course_users.user_id", id),
        db("courses").select("id", "name", "price", "is_verified").where("teacher_id", id),
    ]);

    return { ...user, enrollments, own_courses: courses };
};

exports.blockUser = async (id) => {
    await db("users").where("id", id).update({ is_blocked: true });
    return { message: "Foydalanuvchi bloklandi" };
};

exports.unblockUser = async (id) => {
    await db("users").where("id", id).update({ is_blocked: false });
    return { message: "Foydalanuvchi blokdan chiqarildi" };
};

exports.deleteUser = async (id) => {
    const deleted = await db("users").where("id", id).delete();
    if (!deleted) throw new Error("Foydalanuvchi topilmadi");
    return { message: "Foydalanuvchi o'chirildi" };
};
