const express = require("express");
const {
  getTeachers,
  getcourses,
  courseconfirm,
  teacherconfirm,
  courseReject,
  teacherReject,
  getStats,
  getUsersList,
  getUserDetail,
  blockUserController,
  unblockUserController,
  deleteUserController,
  getTransactionsList,
  getCategoriesList,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("./_controllers");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const isAdmin = require("../../shared/auth/isadmin");

const router = express.Router();

router.use(isLoggedIn, isAdmin);

// Dashboard
router.get("/stats", getStats);

// Foydalanuvchilar
router.get("/users", getUsersList);
router.get("/users/:id", getUserDetail);
router.patch("/users/:id/block", blockUserController);
router.patch("/users/:id/unblock", unblockUserController);
router.delete("/users/:id", deleteUserController);

// O'qituvchilar
router.get("/teachers", getTeachers);
router.patch("/teachers/:id/confirm", teacherconfirm);
router.patch("/teachers/:id/reject", teacherReject);

// Kurslar
router.get("/courses", getcourses);
router.patch("/courses/:id/confirm", courseconfirm);
router.patch("/courses/:id/reject", courseReject);

// Tranzaksiyalar
router.get("/transactions", getTransactionsList);

// Kategoriyalar
router.get("/categories", getCategoriesList);
router.post("/categories", createCategoryController);
router.patch("/categories/:id", updateCategoryController);
router.delete("/categories/:id", deleteCategoryController);

module.exports = router;
