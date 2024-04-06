const express = require('express')
const sponsorController = require('../controller/sponsor.controller')
const userController = require("../controller/user.controller")
const router = express.Router();
const multer = require("multer");
const upload = multer();


router.route('/sponsor')
    .post(upload.none(),sponsorController.CreateSponsor)
    .get(userController.protect,sponsorController.GetAllSponsor)

router.route("/sponsor/:id")
    .get(userController.protect,sponsorController.GetSingleSponsor)

// ---------------------------------------

module.exports = router;