const express = require('express');
const { getTeachers, getcourses, courseconfirm, teacherconfirm } = require('./_controllers');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const isAdmin = require('../../shared/auth/isadmin');


const router = express.Router();

router.get('/teachers',isLoggedIn,isAdmin, getTeachers);
router.get('/courses',isLoggedIn,isAdmin, getcourses);
router.get('/courses/confrm/:id',isLoggedIn,isAdmin, courseconfirm);
router.get('/teacher/confrm/:id',isLoggedIn,isAdmin, teacherconfirm);
module.exports = router;
