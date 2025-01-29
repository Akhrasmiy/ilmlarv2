const express = require('express');
const addUser = require('./add-user');
const httpValidator = require('../../shared/http-validator');
const { postUserSChema, loginUserSchema, verifyUserSchema, forgotpasswordSchema, forgotpassword2Schema, editUserSchema } = require('./_schemas');
const signInUser = require('./login');
const verified = require('./isverified');
const { replynewpassword, newpassword } = require('./replynewpassword');
const { editUser } = require('./edit-user');
const userme = require('./userme');
const { getPublicTeacherAccountService, getPublicTeachersAccountService } = require('./getTeacheraccount');
const editProfileImage = require('./edit_users_image');
const { toggleSubscription } = require('./subscription');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postUserSChema);
    console.log("a")
    // Tasdiqlash kodi yaratish
    const code = Math.floor(Math.random() * 10 ** 6);
    console.log("Tasdiqlash kodi:", code);

    // Yangi foydalanuvchini qo'shish
    const result = await addUser({ ...req.body, code });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const verify = async (req, res, next) => {
  try {
    console.log("a")
    httpValidator({ body: req.body }, verifyUserSchema);

    const result = await verified(req.body, next);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
const forgotPassword = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, forgotpasswordSchema);
    const newpasword = Math.floor(Math.random() * 10 ** 6)
    console.log(newpasword)
    const result = await replynewpassword(req.body.email, newpasword);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
const forgotPassword2 = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, forgotpassword2Schema);
    const newpasword = Math.floor(Math.random() * 10 ** 6)
    console.log(newpasword)
    const result = await newpassword(req.body.email, req.body.password, req.body.emailpassword);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

const loginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, loginUserSchema);

    const result = await signInUser(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const GetUser = async (req, res, next) => {
  try {
    const result = await userme(req.user.id);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId =req.user.id; // user id kerak 
    const { first_name, last_name, user_name, email } = req.body;

    // Validation
    const { error } = editUserSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const updatedUser = await editUser(userId, {
      first_name,
      last_name,
      user_name,
      email,
    });

    if (!updatedUser) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    res.status(200).json({
      message: "Foydalanuvchi muvaffaqiyatli yangilandi.",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const updatesubscription = async (req, res, next) => {
  try {
    const student_id =req.user.id; 
    const teacher_id =req.params.id; 

    
    const updatedUser = await toggleSubscription(student_id, teacher_id);

    if (!updatedUser) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    res.status(200).json({
      message: "Foydalanuvchi muvaffaqiyatli yangilandi.",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
const getPublicTeacherAccount = async (req, res, next) => {
  try {
    const teacherId = req.params.id; // O'qituvchi ID query orqali keladi

    if (!teacherId) {
      return res.status(400).json({ message: "O'qituvchi ID talab qilinadi." });
    }

    const result = await getPublicTeacherAccountService(teacherId);

    res.status(200).json({
      message: "O'qituvchi ma'lumotlari muvaffaqiyatli olindi.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getPublicTeacherAccounts = async (req, res, next) => {
  try {

    const result = await getPublicTeachersAccountService();

    res.status(200).json({
      message: "O'qituvchi ma'lumotlari muvaffaqiyatli olindi.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const editProfileimageController = async (req, res, next) => {
  try {

    // Pass req.files.file (uploaded file) to the service
    const courseId = await editProfileImage(req.user.id,req.files.file);

    res.status(201).json({
      message: "Course created successfully",
      data: { courseId },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getPublicTeacherAccount,
  getPublicTeacherAccounts,
  postUser,
  loginUser,
  verify,
  forgotPassword,
  forgotPassword2,
  GetUser,
  updateUser,
  editProfileimageController,
  updatesubscription
};
