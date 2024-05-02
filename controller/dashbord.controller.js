const asyncErrorHandler = require("../utils/asyncErrorHandler");
const orderModel = require("../models/pujaOrder.model");
const pujaModel = require("../models/puja.model");
const { sponsorModel } = require("../models/sponsor.model");

exports.DashBordTotalOrder = asyncErrorHandler(async (req, res, next) => {
  const totalOrder = await orderModel.aggregate([
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: totalOrder,
  });
});

exports.DashBordTotalPuja = asyncErrorHandler(async (req, res, next) => {
  const totalPuja = await pujaModel.aggregate([
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: totalPuja,
  });
});

exports.DashBordTotalSponsor = asyncErrorHandler(async (req, res, next) => {
  const totalSponsor = await sponsorModel.aggregate([
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: totalSponsor,
  });
});

exports.DashBordPayment = asyncErrorHandler(async (req, res, next) => {
  const paymentData = await orderModel.aggregate([
    {
      $group: {
        _id: "$paid",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: paymentData,
  });
});

exports.DashBordCompleted = asyncErrorHandler(async (req, res, next) => {
  const currentDate = new Date();
  const completedData = await orderModel.aggregate([
    {
      $match: {
        endDate: { $lte: currentDate },
      },
    },
    {
      $count: "completed",
    },
  ]);
  res.status(200).json({
    status: "success",
    data: completedData,
  });
});

exports.DashBordInCompleted = asyncErrorHandler(async (req, res, next) => {
  const currentDate = new Date();
  const incompletedData = await orderModel.aggregate([
    {
      $match: {
        endDate: { $gte: currentDate },
      },
    },
    {
      $count: "incompleted",
    },
  ]);
  res.status(200).json({
    status: "success",
    data: incompletedData,
  });
});

exports.DashBordPujaList = asyncErrorHandler(async (req, res, next) => {
  const currentDate = new Date();
  const incompletedData = await orderModel.aggregate([
    {
      $group: {
        _id: "$pujaName",
        pujaCount: {
          $sum: 1,
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: incompletedData,
  });
});
