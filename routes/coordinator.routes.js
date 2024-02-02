
const express = require('express')
const coordinatorController = require('../controller/coordinator.controller')
const router = express.Router();

const multer = require('multer')
const upload = multer();

router.route('/coordinator')
    .post(upload.none(),coordinatorController.AddCoordinator)
    .get(coordinatorController.GetAllCoordinator)

// ---------------------------------------

module.exports = router;