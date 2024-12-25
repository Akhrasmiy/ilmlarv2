const Joi = require('joi');

exports.postUserSChema = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid("student", "teacher").required(),
    specialization: Joi.string().optional(), // Faqat o'qituvchi uchun
    link: Joi.string().optional(), // Faqat o'qituvchi uchun
    phone: Joi.string().optional(), // Faqat o'qituvchi uchun
    info: Joi.string().optional(), // Faqat o'qituvchi uchun
  }),
};
exports.loginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
exports.verifyUserSchema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
exports.forgotpasswordSchema = {
  body: Joi.object({
    email: Joi.string().required(),
  }),
}
exports.forgotpassword2Schema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    emailpassword: Joi.string().required()
  }),
}
exports.editUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Ismni kiritish majburiy.",
    "string.min": "Ism kamida 2 ta belgidan iborat bo'lishi kerak.",
    "string.max": "Ism 50 ta belgidan oshmasligi kerak.",
  }),
  last_name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Familiyani kiritish majburiy.",
    "string.min": "Familiya kamida 2 ta belgidan iborat bo'lishi kerak.",
    "string.max": "Familiya 50 ta belgidan oshmasligi kerak.",
  }),
  user_name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Foydalanuvchi nomini kiritish majburiy.",
    "string.min": "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak.",
    "string.max": "Foydalanuvchi nomi 30 ta belgidan oshmasligi kerak.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Emailni kiritish majburiy.",
    "string.email": "Email noto'g'ri formatda kiritilgan.",
  }),
});
exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
  }),
};

exports.updatePasswordSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    password: Joi.string().required(),
  }),
};

exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
