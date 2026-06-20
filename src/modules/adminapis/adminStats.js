const db = require("../../db/db.js");

exports.getDashboardStats = async () => {
    const [
        totalUsers,
        totalTeachers,
        totalCourses,
        pendingTeachers,
        pendingCourses,
        totalEnrollments,
        revenueResult,
        recentUsers,
    ] = await Promise.all([
        db("users").count("id as count").first(),
        db("users").where("type", 1).count("id as count").first(),
        db("courses").count("id as count").first(),
        db("teacher_more_date").where("status", 1).count("id as count").first(),
        db("courses").where("is_verified", false).count("id as count").first(),
        db("course_users").count("id as count").first(),
        db("transactions").sum("credit as total").first(),
        db("users")
            .select("id", "first_name", "last_name", "email", "created_at")
            .orderBy("created_at", "desc")
            .limit(5),
    ]);

    return {
        total_users: Number(totalUsers.count),
        total_teachers: Number(totalTeachers.count),
        total_courses: Number(totalCourses.count),
        pending_teachers: Number(pendingTeachers.count),
        pending_courses: Number(pendingCourses.count),
        total_enrollments: Number(totalEnrollments.count),
        total_revenue: Number(revenueResult.total) || 0,
        recent_users: recentUsers,
    };
};
