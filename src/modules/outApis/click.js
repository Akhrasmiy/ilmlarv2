const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi

const clickVerify = async (req, res, next) => {
  try {
    const userId = req.body.merchant_trans_id;
    let user = await db("users")
      .where("payment_id", userId)
      .andWhere("is_verified", true)
      .andWhere("type", 2) // Faqat type: 2 bo'lgan foydalanuvchilar uchun
      .first();

    console.log(user);

    if (!user) {
      return res.send({
        click_trans_id: req.body.click_trans_id,
        merchant_trans_id: req.body.merchant_trans_id,
        merchant_prepare_id: req.body.merchant_trans_id,
        error: -5,
        error_note: "User does not exist or not authorized",
      });
    }

    res.send({
      click_trans_id: req.body.click_trans_id,
      merchant_trans_id: req.body.merchant_trans_id,
      merchant_prepare_id: req.body.merchant_trans_id,
      error: 0,
      error_note: "Success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: -9,
      error_note: "Internal Server Error",
    });
  }
};

const clickTolov = async (req, res, next) => {
  try {
    const userId = req.body.merchant_trans_id;
    console.log(userId);

    // Foydalanuvchini olish
    const user = await db("users")
      .where("payment_id", userId)
      .andWhere("is_verified", true)
      .andWhere("type", 2) // Faqat type: 2 bo'lgan foydalanuvchilar uchun
      .first();

    console.log(user);

    // Foydalanuvchi topilmasa, xatolikni qaytarish
    if (!user) {
      return res.send({
        click_trans_id: req.body.click_trans_id,
        merchant_trans_id: req.body.merchant_trans_id,
        merchant_prepare_id: req.body.merchant_trans_id,
        error: -5,
        error_note: "User does not exist or not authorized",
      });
    }

    const amount = Number(req.body.amount);

    // `transactions` jadvaliga yozuv qo'shish
    await db("transactions").insert({
      user_id: user.id,
      debit: 0, // Kredit bo'lganligi uchun debit 0
      credit: amount, // Kiritilgan summa
      comment: "Click payment", // Eslatma uchun matn
      is_internal: false, // Click to'lov tashqi operatsiya bo'lganligi uchun
    });

    // Muvaffaqiyatli javobni qaytarish
    res.send({
      click_trans_id: req.body.click_trans_id,
      merchant_trans_id: req.body.merchant_trans_id,
      merchant_prepare_id: req.body.merchant_trans_id,
      error: 0,
      error_note: "Success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: -9,
      error_note: "Internal Server Error",
    });
  }
};

module.exports = { clickVerify, clickTolov };
