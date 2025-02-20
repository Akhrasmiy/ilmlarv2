const express = require("express");
const { createCourse, addCourseVideos, completeCourse, updateCourse, updateCourseVideo, getCourses, getSavedCourses, getPurchasedCourses, getCourseDetails, addCommit, addScore, getCoursecardDetails, getCourseDetailswithouttoken, getlessondetails, getCourseDetailsForTeacher, getlessonForTeacherdetails, aaddCourseVideos } = require("./_controllers");
const isTeacher = require("../../shared/auth/isteacher");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const isCourseOwner = require("../../shared/auth/isCourseOwner");
const { getCourseDetailsService } = require("./listCourses");

const router = express.Router();

router.post("/", isLoggedIn, isTeacher, createCourse);
router.post("/videos", isLoggedIn, isTeacher, isCourseOwner, addCourseVideos);
router.patch("/complete", isLoggedIn, isTeacher, isCourseOwner, completeCourse);
router.get("/", isLoggedIn, getCourses);
router.get("/donthavetoken",  getCourses);
router.patch("/:id", isLoggedIn, isTeacher, updateCourse);
router.patch("/videos/:videoId", isLoggedIn, isTeacher, updateCourseVideo);

router.get("/saved-courses", isLoggedIn, getSavedCourses); // Saqlangan kurslarni olish
router.get("/purchased-courses", isLoggedIn, getPurchasedCourses); // Sotib olingan kurslarni olish
router.get("/course/:id", isLoggedIn,  getCourseDetails); // Kurs detallari (sotib olingan yoki olinmagan)
router.get("/course-forteacher/:id", isLoggedIn, isTeacher,  getCourseDetailsForTeacher); 
router.get("/lesson/:id", isLoggedIn,  getlessondetails); // Kurs detallari (sotib olingan yoki olinmagan)
router.get("/lesson-forteacher/:id", isLoggedIn,isTeacher,  getlessonForTeacherdetails); 
router.get("/course/:id/withouttoken",  getCourseDetailswithouttoken); // Kurs detallari (sotib olingan yoki olinmagan)
router.get("/coursecard/:id",  getCoursecardDetails); // Kurs detallari (sotib olingan yoki olinmagan)
router.post("/course/:id/commit", isLoggedIn, addCommit); // Kursga izoh qo'shish
router.post("/course/:id/score", isLoggedIn, addScore); // Kursga baho qo'shish

module.exports = router;
