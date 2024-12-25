const express = require('express');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const { clickVerify, clickTolov, whoiscardowner, payoutteacher } = require('./click');
const isTeacher = require('../../shared/auth/isteacher');

const router = express.Router();

router.post('/click/verify', clickVerify);
router.post('/click/tolov', clickTolov);
router.post('/whoiscardowner/:cardNumber',isLoggedIn,isTeacher, whoiscardowner);
router.post('/payoutteacher',isLoggedIn,isTeacher, payoutteacher);
module.exports = router;
