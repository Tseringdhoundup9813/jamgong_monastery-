const express = require("express");
const sponsorController = require("../controller/sponsor.controller");
const userController = require("../controller/user.controller");
const emailController = require("../controller/email.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router
  .route("/sponsor")
  .post(upload.none(), sponsorController.CreateSponsor)
  .get(userController.protect, sponsorController.GetAllSponsor);

router
  .route("/sponsor/:id")
  .get(userController.protect, sponsorController.GetSingleSponsor)
  .delete(sponsorController.DeleteSingleSponsor);

// ---------------------------------------

router.route("/sponsor/email").post(emailController.sendEmailToSponsor);

module.exports = router;
