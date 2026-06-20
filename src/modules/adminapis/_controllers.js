const { getTeachersservise } = require("./getteachers");
const { getCoursesService } = require("./getcourses");
const { confirmCourse } = require("./confirmation_course");
const { confirmTeacher } = require("./confirmation_teacher");
const { rejectCourse } = require("./rejectCourse");
const { rejectTeacher } = require("./rejectTeacher");
const { getUsers, getUserById, blockUser, unblockUser, deleteUser } = require("./adminUsers");
const { getDashboardStats } = require("./adminStats");
const { getTransactions } = require("./adminTransactions");
const { getCategories, createCategory, updateCategory, deleteCategory } = require("./adminCategories");
const { getEnrollments, createTestEnrollment, deleteEnrollment, getTestEnrollments } = require("./adminEnrollments");

const getTeachers = async (req, res, next) => {
  try {
    const result = await getTeachersservise();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getcourses = async (req, res, next) => {
  try {
    const result = await getCoursesService();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const courseconfirm = async (req, res, next) => {
  try {
    const result = await confirmCourse(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const teacherconfirm = async (req, res, next) => {
  try {
    const result = await confirmTeacher(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const courseReject = async (req, res, next) => {
  try {
    const result = await rejectCourse(req.params.id, req.body.reason);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const teacherReject = async (req, res, next) => {
  try {
    const result = await rejectTeacher(req.params.id, req.body.reason);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const result = await getDashboardStats();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getUsersList = async (req, res, next) => {
  try {
    const { page, limit, search, type, is_blocked } = req.query;
    const result = await getUsers({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      search: search || "",
      type: type !== undefined ? Number(type) : null,
      is_blocked: is_blocked !== undefined ? is_blocked === "true" : null,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getUserDetail = async (req, res, next) => {
  try {
    const result = await getUserById(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const blockUserController = async (req, res, next) => {
  try {
    const result = await blockUser(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const unblockUserController = async (req, res, next) => {
  try {
    const result = await unblockUser(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getTransactionsList = async (req, res, next) => {
  try {
    const { page, limit, user_id, is_internal } = req.query;
    const result = await getTransactions({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      user_id: user_id !== undefined ? Number(user_id) : null,
      is_internal: is_internal !== undefined ? is_internal === "true" : null,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCategoriesList = async (req, res, next) => {
  try {
    const result = await getCategories();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const createCategoryController = async (req, res, next) => {
  try {
    const result = await createCategory(req.body.name);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const updateCategoryController = async (req, res, next) => {
  try {
    const result = await updateCategory(req.params.id, req.body.name);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController = async (req, res, next) => {
  try {
    const result = await deleteCategory(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getEnrollmentsList = async (req, res, next) => {
  try {
    const { page, limit, course_id, user_id } = req.query;
    const result = await getEnrollments({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
      course_id: course_id ? Number(course_id) : null,
      user_id: user_id ? Number(user_id) : null,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createTestEnrollmentController = async (req, res, next) => {
  try {
    const { user_id, course_id, note } = req.body;
    const result = await createTestEnrollment({
      user_id: Number(user_id),
      course_id: Number(course_id),
      note,
      admin_id: req.user.id,
    });
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const deleteEnrollmentController = async (req, res, next) => {
  try {
    const result = await deleteEnrollment(req.params.id);
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getTestEnrollmentsList = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await getTestEnrollments({
      page: page ? Number(page) : 1,
      limit: limit ? Math.min(Number(limit), 100) : 20,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
  getEnrollmentsList,
  createTestEnrollmentController,
  deleteEnrollmentController,
  getTestEnrollmentsList,
};
