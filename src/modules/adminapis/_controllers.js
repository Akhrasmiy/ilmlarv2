const express = require('express');
const httpValidator = require('../../shared/http-validator');
const { getTeachersservise } = require('./getteachers');
const { getCoursesService } = require('./getcourses');
const { confirmCourse } = require('./confirmation_course');
const { confirmTeacher } = require('./confirmation_teacher');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getTeachers = async (req, res, next) => {
  try {
    const result = await getTeachersservise();

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getcourses = async (req, res, next) => {
  try {
    const result = await getCoursesService();

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const courseconfirm = async (req, res, next) => {
  try {
    const result = await confirmCourse(req.params.id);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const teacherconfirm = async (req, res, next) => {
  try {
    const result = await confirmTeacher(req.params.id);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getTeachers,getcourses,courseconfirm,teacherconfirm
};
