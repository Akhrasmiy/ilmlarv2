const express = require('express');
const { postUser, loginUser, verify, forgotPassword, forgotPassword2, GetUser, updateUser, getPublicTeacherAccount, getPublicTeacherAccounts, editProfileimageController, updatesubscription, getsubscription } = require('./_controllers');
const isLoggedIn = require('../../shared/auth/is-loggedin');

const router = express.Router();

router.post('/', postUser);
router.put('/',isLoggedIn, updateUser);
router.put('/subscription/:id',isLoggedIn, updatesubscription);
router.get('/subscription/:id',isLoggedIn, getsubscription);
router.get('/userme',isLoggedIn, GetUser);
router.get('/teacheraccout/:id', getPublicTeacherAccount);
router.get('/teacheraccouts/', getPublicTeacherAccounts);
router.post('/verify',verify );
router.post('/editprofileimage',isLoggedIn,editProfileimageController );
router.post('/login',loginUser)
router.post('/forgot1',forgotPassword)
router.post('/forgot2',forgotPassword2)
module.exports = router;
