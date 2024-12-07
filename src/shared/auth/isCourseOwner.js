const db = require("../../db/db");
const { ForbiddenError, NotFoundError } = require("../errors/index.js");

/**
 * Middleware to check if the logged-in teacher is the owner of the course
 */
const isCourseOwner = async (req, res, next) => {
  try {
    const teacherId = req.user.id; // Extract teacher ID from the token
    const { course_id } = req.body; // Assuming course ID is passed in the body

    const course = await db("courses")
      .where({ id: course_id, teacher_id: teacherId })
      .first();

    if (!course) {
      throw new ForbiddenError("Bu kurs sizga tegishli emas yoki mavjud emas.");
    }

    req.course = course; // Attach course details to the request
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isCourseOwner;
