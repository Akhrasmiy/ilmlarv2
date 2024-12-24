const Joi = require("joi");

const createCourseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, ""),
  category: Joi.number().integer().required(),
  price: Joi.number().positive().allow(0).optional(),
  period: Joi.number().integer().optional(),
  level: Joi.number().integer().optional(),
  language: Joi.number().integer().optional(),
  trieler: Joi.string().allow(""),
  study_parties: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
      })
    )
    .optional(),
});

const addCourseVideosSchema = Joi.object({
  course_id: Joi.number().integer().required(),
  video: Joi.array()
    .items(
      Joi.object({
        file: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().allow(null, ""),
        video_link: Joi.string().uri().required(),
        is_open: Joi.boolean().optional(),
      })
    )
    .required(),
});

const completeCourseSchema = Joi.object({
  course_id: Joi.number().integer().required(),
});

const addCommitSchema = Joi.object({
  text: Joi.string()
    .min(1)
    .max(1000)
    .required()
    .messages({
      "string.empty": "Izoh matni bo'sh bo'lmasligi kerak.",
      "string.min": "Izoh matni kamida 1 ta belgidan iborat bo'lishi kerak.",
      "string.max": "Izoh matni 1000 ta belgidan oshmasligi kerak.",
      "any.required": "Izoh matni talab qilinadi.",
    }),
});

// Baho qo'shish uchun schema
const addScoreSchema = Joi.object({
  score: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      "number.base": "Baho raqam bo'lishi kerak.",
      "number.integer": "Baho butun son bo'lishi kerak.",
      "number.min": "Baho kamida 1 bo'lishi kerak.",
      "number.max": "Baho ko'pi bilan 5 bo'lishi kerak.",
      "any.required": "Baho talab qilinadi.",
    }),
});
module.exports = {
  addCommitSchema,
  addScoreSchema,
  completeCourseSchema,
  createCourseSchema,
  addCourseVideosSchema
};