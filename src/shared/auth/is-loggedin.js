const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../../db/db.js"); // Knex konfiguratsiyasi
const { UnauthorizedError, NotFoundError } = require("../errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isLoggedIn = async (req, res, next) => {
  try {
    // Tokenni olish
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Token mavjud emas. Kirish talab qilinadi.");
    }

    // Tokenni tekshirish va decode qilish
    const decoded = jwt.verify(token, config.jwt.secret, {
      ignoreExpiration: false,
    });

    // Token ichidan foydalanuvchi ID'sini olish
    const userId = decoded.user?.id;

    if (!userId) {
      throw new UnauthorizedError("Token noto'g'ri.");
    }

    // Foydalanuvchini bazadan topish
    const user = await db("users").where({ id: userId }).first();

    if (!user) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    // Foydalanuvchini `req.user` ga biriktirish
    req.user = user;

    next(); // Middleware'ni davom ettirish
  } catch (error) {
    console.error(error);
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isLoggedIn;
