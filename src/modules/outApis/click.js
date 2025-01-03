const db = require("../../db/db.js"); // Knex konfiguratsiyasi import qilinadi
const axios = require("axios");
const { randomUUID } = require("crypto");
const httpValidator = require("../../shared/http-validator/index.js");
const { payoutSchema } = require("./_schemas.js");

const clickVerify = async (req, res, next) => {
  try {
    console.log("tekshirildi", req.body);
    const userId = req.body.merchant_trans_id;
    console.log(userId);
    let user = await db("users")
      .where("payment_id", userId)
      .andWhere("is_verified", true)
      .andWhere("type", 2) // Faqat type: 2 bo'lgan foydalanuvchilar uchun
      .first();

    console.log(user, 22);

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
    console.log("tolandi");

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

    await db("own_transaction").insert({
      total:-amount*0.03,
      provider_fee:-amount*0.02,
      tax_it_park:-amount*0.01,
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
const whoiscardowner = async (req, res, next) => {
  try {
    const cardNumber = req.params.cardNumber;

    const username = "ilmlarcom";
    const password = "dEpSPx^LWnK79VhC(EKh-A]*P";
    const authString = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    const response = await axios.post(
      "https://pay.myuzcard.uz/api/Credit/getCardOwnerInfoByPan",
      { cardNumber: cardNumber },
      { headers: { Authorization: `Basic ${authString}` } }
    );

    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const payoutteacher = async (req, res, next) => {
  try {
    // Validate the request body
    httpValidator({ body: req.body }, payoutSchema);

    const userId = req.user.id; // User ID olish
    const amount = req.body.amount; // To'lov summasi

    // Foydalanuvchini olish
    const user = await db("users").where("id", userId).first();
    if (!user) {
      return res.status(404).send("Foydalanuvchi topilmadi");
    }

    // Hisobni tekshirish
    const userBalance = await db("transactions")
      .where("user_id", userId)
      .sum("credit as totalCredit")
      .sum("debit as totalDebit")
      .first();

    const balance =
      (userBalance.totalCredit || 0) - (userBalance.totalDebit || 0);
    console.log(user, userBalance, balance);
    if (balance < amount) {
      return res.status(400).send("Hisobda yetarli pul mavjud emas");
    }

    // MyUzCard orqali to'lov ma'lumotlari
    const extraId = randomUUID(); // Generate a unique extraId
    const data = {
      extraId,
      transactionData: req.body.transactionData,
    };

    const username = "ilmlarcom";
    const password = "dEpSPx^LWnK79VhC(EKh-A]*P";
    const authString = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );

    // To'lovni amalga oshirish
    const response = await axios.post(
      "https://pay.myuzcard.uz/api/Credit/Credit",
      { ...data, ...req.body },
      { headers: { Authorization: `Basic ${authString}` } }
    );

    if (response.status === 200) {
      // Transactions jadvaliga yozuv qo'shish
      await db("transactions").insert({
        user_id: userId,
        debit: amount, // Pul yechish
        credit: 0,
        comment: "Payment to teacher",
        is_internal: false,
        extra_id: extraId, // Save the generated extraId for reference
      });

      return res
        .status(201)
        .send({ message: "To'lov muvaffaqiyatli amalga oshirildi", extraId });
    } else {
      return res.status(400).send(response.data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Ichki xatolik yuz berdi" });
  }
};


module.exports = { clickVerify, clickTolov, whoiscardowner, payoutteacher };
