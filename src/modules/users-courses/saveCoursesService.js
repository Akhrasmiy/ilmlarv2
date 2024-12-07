const knex = require('../../db/db.js');

/**
 * @param {Object} data
 * @param {number} data.course_id
 * @param {number} data.user_id
 */
const saveCourseService = async (data) => {
    const { course_id, user_id } = data;
    const savecourse = await knex('save_courses').where({ user_id: user_id, course_id: course_id }).first()
    // Kursni saqlash
    if (!savecourse) {
        const [savedCourse] = await knex('save_courses')
            .insert({ course_id, user_id })
            .returning(['id', 'course_id', 'user_id', 'created_date']);
        return { action: "saved", ...savedCourse };

    }
    if (savecourse) {
        const [savedCourse] = await knex('save_courses')
            .delete().where({ course_id, user_id })
            .returning(['id', 'course_id', 'user_id', 'created_date']);
        return { action: "not-saved", ...savedCourse };

    }
};

module.exports = {
    saveCourseService,
};
