const express = require('express')
const sponsorController = require('../controller/sponsor.controller')
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.route('/sponsor')
    .post(upload.none(),sponsorController.CreateSponsor)
    .get(sponsorController.GetAllSponsor)

router.route("/sponsor/:id")
    .get(sponsorController.GetSingleSponsor)

// ---------------------------------------

module.exports = router;