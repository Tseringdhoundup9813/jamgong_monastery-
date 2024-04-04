const express = require('express')
const router = express.Router();
const userController = require("../controller/user.controller")


router.route("/signup")
    .post(userController.createUser)

router.route("/signin")
    .post(userController.signIn)

module.exports = router;