
const { createCourseSchema, addCourseVideosSchema, completeCourseSchema, editCourseVideosSchema } = require("./_schemas");
const { BadRequestError } = require("../../shared/errors");
const { createCourseService } = require("./createCourseservise");
const { addCourseVideosService } = require("./addCourseVideosServise");
const { completeCourseService } = require("./completedCourse");
const db = require("../../db/db.js");
const { imguploads } = require("../../shared/uploads/imgupload");
const { uploadTrailerToVimeo } = require("../../shared/uploads/uploadTrailerService");
const { updateCourseService, updateCourseVideoService } = require("./editCourseService.js");
const { getCoursesService, getCoursecardDetailsService } = require("./listCourses.js");

exports.createCourse = async (req, res, next) => {
  try {
    console.log(req.body)
    // Parse `study_parties` string to array
    if (req.body.study_parties) {
      try {
        // Agar `study_parties` string bo'lsa, uni JSON obyektiga aylantiring
        if (typeof req.body.study_parties === "string") {
          req.body.study_parties = JSON.parse(req.body.study_parties);
        }

        // Har bir elementni tekshirish va string bo'lsa JSON parse qilish
        req.body.study_parties = req.body.study_parties.map((party) => {
          if (typeof party === "string") {
            return JSON.parse(party); // Stringni obyektga aylantirish
          }
          return party; // Agar obyekt bo'lsa, qaytarish
        });
      } catch (parseError) {
        throw new BadRequestError(`"study_parties" noto'g'ri formatda`);
      }
    }
    console.log(req.files)

    // Validate incoming data
    const { error } = createCourseSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Pass req.files.file (uploaded file) to the service
    const courseId = await createCourseService({ ...req.body, teacher_id: req.user.id }, req.files?.file, req.files?.trieler);

    res.status(201).json({
      message: "Course created successfully",
      data: { courseId },
    });
  } catch (err) {
    next(err);
  }
};

exports.addCourseVideos = async (req, res, next) => {
  try {
    const { error } = addCourseVideosSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    await addCourseVideosService(req.body, req.user.id, req.files.video, req.files?.file);

    res.status(201).json({
      message: "Videos added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

exports.completeCourse = async (req, res, next) => {
  try {
    const { error } = completeCourseSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    await completeCourseService(req.body, req.user.id);

    res.status(200).json({
      message: "Course marked as completed.",
    });
  } catch (error) {
    next(error);
  }
};




exports.updateCourse = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);

    // Validatsiya
    const { error } = createCourseSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const courseId = req.params.id;
    const teacherId = req.user.id;

    console.log("Course ID:", courseId, "Teacher ID:", teacherId);

    await updateCourseService(courseId, teacherId, req.body, req.files);

    res.status(200).json({
      message: "Kurs muvaffaqiyatli yangilandi.",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCourseVideo = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    const teacherId = req.user.id;

    // Validatsiya
    const { error } = editCourseVideosSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    await updateCourseVideoService(videoId, teacherId, req.body, req.files);

    res.status(200).json({
      message: "Video muvaffaqiyatli yangilandi.",
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    const courses = await getCoursesService(userId, userRole);

    res.status(200).json({
      message: "Kurslar muvaffaqiyatli olindi.",
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

const { 
  getSavedCoursesService, 
  getPurchasedCoursesService, 
  getCourseDetailsService,
} = require("./listCourses.js");
const { addScoreService, addCommitService } = require("./commitvsgrove.js");

exports.getSavedCourses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const courses = await getSavedCoursesService(userId);

    res.status(200).json({
      message: "Saqlangan kurslar muvaffaqiyatli olindi.",
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPurchasedCourses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const courses = await getPurchasedCoursesService(userId);

    res.status(200).json({
      message: "Sotib olingan kurslar muvaffaqiyatli olindi.",
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourseDetails = async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    const course = await getCourseDetailsService(userId, courseId);

    res.status(200).json({
      message: "Kurs detallari muvaffaqiyatli olindi.",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};
exports.getCoursecardDetails = async (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    const course = await getCoursecardDetailsService(userId, courseId);

    res.status(200).json({
      message: "Kurs detallari muvaffaqiyatli olindi.",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

const { addCommitSchema, addScoreSchema } = require("./_schemas");

exports.addCommit = async (req, res, next) => {
  try {
    // Joi validatsiya
    const { error } = addCommitSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const courseId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { text } = req.body;

    const result = await addCommitService(userId, courseId, text);

    res.status(201).json({
      message: "Izoh muvaffaqiyatli qo'shildi.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.addScore = async (req, res, next) => {
  try {
    // Joi validatsiya
    const { error } = addScoreSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const courseId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { score } = req.body;

    const result = await addScoreService(userId, courseId, score);

    res.status(201).json({
      message: "Baho muvaffaqiyatli qo'shildi.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};



