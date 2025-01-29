const knex = require('../../db/db.js');

async function toggleSubscription(studentId, teacherId) {
  try {
    // Check if the student exists and is of type 2
    const student = await knex('users')
      .where({ id: studentId, type: 2 })
      .first();
    if (!student) {
      return { message: 'Invalid student ID or the user is not a student' };
    }

    // Check if the teacher exists and is of type 1
    const teacher = await knex('users')
      .where({ id: teacherId, type: 1 })
      .first();
    if (!teacher) {
      return { message: 'Invalid teacher ID or the user is not a teacher' };
    }

    // Check if the subscription already exists
    const existingSubscription = await knex('subscriptions')
      .where({ student_id: studentId, teacher_id: teacherId })
      .first();

    if (existingSubscription) {
      // If subscription exists, delete it (unsubscribe)
      await knex('subscriptions')
        .where({ student_id: studentId, teacher_id: teacherId })
        .del();
      return { message: 'Unsubscribed successfully' };
    } else {
      // If subscription does not exist, create it (subscribe)
      await knex('subscriptions').insert({
        student_id: studentId,
        teacher_id: teacherId,
      });
      return { message: 'Subscribed successfully' };
    }
  } catch (error) {
    console.error('Error toggling subscription:', error);
    throw error;
  }
}

async function getSubscriptionStatus(studentId, teacherId) {
  try {
    const subscription = await knex('subscriptions')
      .where({ student_id: studentId, teacher_id: teacherId })
      .first();

    return subscription ? { subscribed: true } : { subscribed: false };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    throw error;
  }
}

module.exports = {
  toggleSubscription,
  getSubscriptionStatus,
};