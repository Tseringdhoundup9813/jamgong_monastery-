
const express = require('express')
const coordinatorController = require('../controller/coordinator.controller')
const router = express.Router();

router.route('/coordinator')
    .post(coordinatorController.AddCoordinator)
    .get(coordinatorController.GetAllCoordinator)
// ---------------------------------------

module.exports = router;