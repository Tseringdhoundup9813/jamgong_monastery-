const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // DEFINE EMAIL OPTION
  const emailOptions = {
    from: "JamgonMonestry",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
