const express = require("express");
const orderController = require("../controller/order.controller");
const {
  DashBordTotalOrder,
  DashBordTotalPuja,
  DashBordTotalSponsor,
  DashBordPayment,
  DashBordCompleted,
  DashBordInCompleted,
  DashBordPujaList,
} = require("../controller/dashbord.controller");
const router = express.Router();

const upload = require("../middleware/upload.middleware");

router.route("/orderconfirm").post(upload.none(), orderController.OrderConfirm);
router.route("/order/delete/:id").get(orderController.DeleteOrderPuja);

router.route("/sponsorOrderList/:id").get(orderController.SponsorPujaOrderList);
router.route("/order").get(orderController.GetAllOrder);

// dashboard
router.route("/dashboard/total/order").get(DashBordTotalOrder);
router.route("/dashboard/total/puja").get(DashBordTotalPuja);
router.route("/dashboard/total/sponsor").get(DashBordTotalSponsor);
router.route("/dashboard/total/payment").get(DashBordPayment);
router.route("/dashboard/total/completed").get(DashBordCompleted);
router.route("/dashboard/total/incompleted").get(DashBordInCompleted);
router.route("/dashboard/puja/status").get(DashBordPujaList);

router
  .route("/order/payment/status/:id")
  .post(orderController.UpdatePaymentStatus);

module.exports = router;
