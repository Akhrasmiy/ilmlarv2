const knex = require("../../db/db.js");
 // Knex config faylingizni ulang

async function confirmCourse(courseId) {
    try {
        const result = await knex('courses')
            .where('id', courseId)
            .update({
                is_verified: true
            });

        if (result) {
            console.log(`Course with ID ${courseId} has been verified.`);
        } else {
            console.log(`No course found with ID ${courseId}.`);
        }
    } catch (error) {
        console.error('Error confirming course:', error);
    }
}

module.exports = {
    confirmCourse
};
