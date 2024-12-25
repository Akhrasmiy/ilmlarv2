const db = require("../../db/db.js");
const { ForbiddenError } = require("../errors/index.js");

/**
 * Middleware to check if the user is a teacher
 */
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id; // Extract user ID from the token (set by isLoggedIn middleware)
    
    const user = await db("users")
      .where({ id: userId, type: 3 }) // Assume `type: 2` indicates a teacher
      .first();

    if (!user) {
      throw new ForbiddenError("Siz bu amalni bajarish huquqiga ega emassiz.");
    }

    req.user.isTeacher = true; // Set flag for later use
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
