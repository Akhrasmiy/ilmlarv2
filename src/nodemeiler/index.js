const axios = require("axios");
const { BadRequestError } = require("../shared/errors");

const sendEmail = async (email, password) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Ilmlar", email: "info@ilmlar.com" },
        to: [{ email: email }],
        subject: "Tasdiqlash kodi",
        htmlContent: `<h1>${password}</h1>`
      },
      {
        headers: {
          "api-key": "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", // Brevo API kalitingizni shu joyga qo'ying
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.messageId;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.response?.data || error.message);
    throw new BadRequestError("Kod yuborishda xatolik");
  }
};

module.exports = sendEmail;
