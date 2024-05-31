const sendEmail = require("../utils/email");
const asyncHandler = require("../utils/asyncErrorHandler");

exports.sendEmailToSponsor = asyncHandler(async (req, res, next) => {
  const payload = {
    email: "tseringlama9813694977@gmail.com",
    subject: "try to send email using node js",
    text: "hello world",
  };
  const emailResponse = await sendEmail(payload);
  res.status(200).json({
    emailResponse,
  });
  console.log(emailResponse);
  console.log("send email to client");
});
