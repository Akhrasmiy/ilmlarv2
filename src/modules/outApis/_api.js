const express = require('express');
const isLoggedIn = require('../../shared/auth/is-loggedin');
const { clickVerify, clickTolov } = require('./click');

const router = express.Router();

router.post('/click/verify', clickVerify);
router.post('/click/tolov', clickTolov);
module.exports = router;
