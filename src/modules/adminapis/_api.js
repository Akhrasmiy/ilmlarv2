const express = require('express');
const { getTeachers, getcourses } = require('./_controllers');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const isAdmin = require('../../shared/auth/isadmin');


const router = express.Router();

router.get('/teachers',isLoggedIn,isAdmin, getTeachers);
router.get('/courses',isLoggedIn,isAdmin, getcourses);
module.exports = router;
