const express = require('express')
const sponsorController = require('../controller/sponsor.controller')
const router = express.Router();

router.route('/sponsor')
    .post(sponsorController.CreateSponsor)
    .get(sponsorController.GetAllSponsor)

router.route("/sponsor/:id")
    .get(sponsorController.GetSingleSponsor)

// ---------------------------------------

module.exports = router;