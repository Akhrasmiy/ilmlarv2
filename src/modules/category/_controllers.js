const express = require('express');
const addUser = require('./add-user');
const httpValidator = require('../../shared/http-validator');
const { postUserSChema, loginUserSchema, verifyUserSchema, forgotpasswordSchema, forgotpassword2Schema, editUserSchema } = require('./_schemas');
const signInUser = require('./login');
const verified = require('./isverified');
const { replynewpassword, newpassword } = require('./replynewpassword');
const { editUser } = require('./edit-user');
const userme = require('./userme');
const { getPublicTeacherAccountService } = require('./getTeacheraccount');
const { getcategories } = require('./show-user');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const GetCategory = async (req, res, next) => {
  try {
    const result = await getcategories();

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetCategory
};
