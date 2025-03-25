const nodeMailer = require("nodemailer");
const { BadRequestError } = require("../shared/errors");

const sendEmail = async (email, password) => {
  const transporter = await nodeMailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "88d729001@smtp-brevo.com",
      pass: "ON4ZzktGjWa6wQgX" // Master Password ni shu joyga qo'ying
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "verify@ilmlar.com",
      to: email,
      subject: "Tasdiqlash kodi",
      html: `<h1>${password}</h1>`,
    });

    return info.messageId;
  } catch (error) {
    console.log(error);
    throw new BadRequestError("Kod yuborishda xatolik");
  }
};

module.exports = sendEmail;
