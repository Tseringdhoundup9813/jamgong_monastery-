const express = require('express')
const router = express.Router();
const userController = require("../controller/user.controller")


router.route("/signup")
    .post(userController.createUser)

router.route("/signin")
    .post(userController.signIn)

router.route('/forgetpassword')
    .post(userController.forgetPassword)

    
router.route('/resetpassword/:token')
    .patch(userController.resetPassword)

module.exports = router;