const { hash } = require("bcryptjs");
const Joi = require("joi");
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const db = require("../../db/db.js"); // Knex konfiguratsiyasi
const sendEmail = require("../../nodemeiler");

exports.forgotpasswordSchema = {
  body: Joi.object({
    email: Joi.string().required(),
  }),
};

exports.forgotpassword2Schema = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    emailpassword: Joi.string().required(),
  }),
};

// Tasodifiy parol yuborish funksiyasi
exports.replynewpassword = async (email, password) => {
  try {
    const existing = await db("users").where({ email }).first();

    if (!existing) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    await sendEmail(email, password);

    await db("confirmation_code").insert({
      user_id: existing.id,
      code: password,
      created_at: new Date(),
    });

    return existing.email;
  } catch (error) {
    throw new BadRequestError("Xatolik yuz berdi: " + error.message);
  }
};

// Yangi parol o'rnatish funksiyasi
exports.newpassword = async (email, password, emailpassword) => {
  try {
    const existing = await db("users").where({ email }).first();
    if (!existing) {
      throw new NotFoundError("Foydalanuvchi topilmadi.");
    }

    const code = await db("confirmation_code")
      .where({ user_id: existing.id })
      .first();

    if (!code || code.code !== emailpassword) {
      throw new BadRequestError("Kod noto'g'ri.");
    }

    const time = Date.now() - new Date(code.created_at);
    if (time / 1000 / 60 > 3) {
      await db("confirmation_code").where({ user_id: existing.id }).del();
      throw new BadRequestError("Kodning muddati o'tib ketdi.");
    }

    const hashedPassword = await hash(password, 10);

    await db("users")
      .where({ id: existing.id })
      .update({ password: hashedPassword });

    await db("confirmation_code").where({ user_id: existing.id }).del();

    return { email: existing.email };
  } catch (error) {
    throw new BadRequestError("Xatolik yuz berdi: " + error.message);
  }
};
