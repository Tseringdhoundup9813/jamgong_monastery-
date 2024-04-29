const express = require('express')
const orderController = require('../controller/order.controller')
const router = express.Router();

const upload = require("../middleware/upload.middleware")


router.route('/orderconfirm')
        .post(upload.none(),orderController.OrderConfirm)

router.route("/sponsorOrderList/:id")
        .get(orderController.SponsorPujaOrderList)
router.route("/order")
        .get(orderController.GetAllOrder)
module.exports = router;