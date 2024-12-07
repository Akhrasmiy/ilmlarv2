

const nodeMailer = require("nodemailer");
const { BadRequestError } = require("../shared/errors");

const sendEmail = async (email, password) => {
  const transporter = await nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "giybatchat@gmail.com",
      pass: "ifgmmkgchsuymepg",
    },
  });
  try {
    const info = await transporter.sendMail({
      from: "giybatchat@gmail.com",
      to: email,
      subject: "tasdiqlash kodi",
      html: `<h1>${password}<h1>`,
    });
    return info.messageId;
  } catch (error) {
    console.log(error);
    throw new BadRequestError("kod yuborishda hatolik");
  }
};

module.exports = sendEmail;
