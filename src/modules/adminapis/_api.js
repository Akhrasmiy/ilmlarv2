const express = require('express');
const { getTeachers } = require('./_controllers');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const isAdmin = require('../../shared/auth/isadmin');


const router = express.Router();

router.get('/teachers',isLoggedIn,isAdmin, getTeachers);
module.exports = router;
