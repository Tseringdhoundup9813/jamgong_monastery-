const express = require('express')
const pujaController = require('../controller/puja.controller')
const router = express.Router();

const upload = require("../middleware/upload.middleware")

router.route('/puja')
    .post(upload.single('image'),pujaController.CreatePuja)
    // .get(sponsorController.GetAllSponsor)

// router.route("/sponsor/:id")
    // .get(sponsorController.GetSingleSponsor)

// ---------------------------------------

module.exports = router;