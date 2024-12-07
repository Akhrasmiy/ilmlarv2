const express = require('express');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const { saveCourses, buyCourse } = require('./_controllers');

const router = express.Router();

router.get('/save-courses/:id',isLoggedIn, saveCourses);
router.get('/buy-course/:id', isLoggedIn, buyCourse);
module.exports = router;
