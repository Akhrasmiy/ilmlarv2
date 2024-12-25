const knex = require("../../db/db.js");
 // Knex config faylingizni ulang


 async function confirmTeacher(userId) {
    try {
        // "active" statusining ID sini olish (teacher_status jadvalidan)
        const activeStatus = await knex('teacher_status')
            .select('id')
            .where('name', 'active')
            .first();

        if (!activeStatus) {
            console.error('Active status not found in teacher_status table.');
            return;
        }

        // Teacher statusini yangilash
        const result = await knex('teacher_more_date')
            .where('user_id', userId)
            .update({
                status: activeStatus.id
            });

        if (result) {
            console.log(`Teacher with user ID ${userId} has been verified and set to active.`);
        } else {
            console.log(`No teacher found with user ID ${userId}.`);
        }
    } catch (error) {
        console.error('Error confirming teacher:', error);
    }
}

module.exports = {
    confirmTeacher
};
