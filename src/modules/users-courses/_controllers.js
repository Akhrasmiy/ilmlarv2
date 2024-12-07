const { saveCourseService } = require('./saveCoursesService');
const httpValidator = require('../../shared/http-validator');
const { saveCourseSchema } = require('./_schemas');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const saveCourses = async (req, res, next) => {
  try {
    // URL orqali kurs ID'sini olish
    const course_id = parseInt(req.params.id, 10);

    // Foydalanuvchi ID'sini req.user'dan olish
    const user_id = req.user.id;

    // Tasdiqlash (kurs ID tekshiruvi)
    if (!course_id) {
      return res.status(400).json({
        message: 'Kurs ID noto‘g‘ri.',
      });
    }

    // Kursni saqlash xizmatini chaqirish
    const savedCourse = await saveCourseService({ course_id, user_id });

    res.status(201).json({
      message: 'Kurs muvaffaqiyatli saqlandi.',
      data: savedCourse,
    });
  } catch (error) {
    next(error);
  }
};
const { buyCourseService } = require('./buyCourseService');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const buyCourse = async (req, res, next) => {
  try {
    const course_id = parseInt(req.params.id, 10); // URL orqali kurs ID
    const user_id = req.user.id; // Foydalanuvchi ID (autentifikatsiyadan)

    // Kurs ID tekshiruvi
    if (!course_id) {
      return res.status(400).json({
        message: 'Kurs ID noto‘g‘ri.',
      });
    }

    // Kursni sotib olish xizmatini chaqirish
    const result = await buyCourseService({ course_id, user_id });

    res.status(result.status).json(result.response);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  saveCourses,
  buyCourse
};
