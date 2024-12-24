const db = require("../../db/db.js");



// 1. Saqlangan kurslarni olish
exports.getcategories = async () => {
  return await db("category")
};

