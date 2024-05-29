const asyncErrorHandler = require("../utils/asyncErrorHandler");
const pujaOrderModel = require("../models/pujaOrder.model");
const { sponsorModel } = require("../models/sponsor.model");
const selectedPujaModel = require("../models/selectedpuja.model");
const crypto = require("crypto");
const path = require("path");
const { match } = require("assert");

exports.OrderConfirm = asyncErrorHandler(async (req, res, next) => {
  let {
    pujaId,
    sponsorId,
    pujaName,
    coordinatorCode,
    duration,
    cost,
    paid,
    startDate,
    endDate,
    dedicators,
    currency,
    actualAmount,
  } = req.body;
  dedicators = JSON.parse(dedicators);

  const randome4Digit = crypto
    .randomInt(0, 10 ** 4 - 1)
    .toString()
    .padStart(4, "0");
  let pujaNameArray = pujaName.split(" ");

  // shorthen the puja name
  let prayerShortForm = [];
  pujaNameArray.map((item) => {
    prayerShortForm.push(item[0]);
  });
  prayerShortForm = prayerShortForm.join("");
  prayerShortForm = prayerShortForm.toUpperCase();

  let id = `${prayerShortForm}-${new Date().getFullYear()}-${new Date().getMonth()}-${randome4Digit}`;

  let sponsor = await sponsorModel.findOne({ _id: sponsorId });

  const createOrder = await pujaOrderModel.create({
    sponsor: sponsor,
    id,
    pujaName,
    coordinatorCode,
    duration,
    cost,
    paid,
    startDate,
    endDate,
    dedicators,
    currency,
    actualAmount,
  });

  const selectedPujaList = await selectedPujaModel.findOne({
    sponsor: sponsorId,
  });
  const removeFromSelectedPuja = await selectedPujaModel.updateOne(
    { sponsor: sponsorId },
    { $pull: { selectedlist: { selectedPuja: pujaId } } }
  );

  res.status(201).json({
    status: "success",
    message: `${pujaName} is confirm`,
  });
});

exports.SponsorPujaOrderList = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const orderlist = await pujaOrderModel.find({ "sponsor._id": id });
  res.status(200).json({
    status: "success",
    data: orderlist,
  });
});

exports.GetAllOrder = asyncErrorHandler(async (req, res, next) => {
  const excludeFields = [
    "sort",
    "page",
    "limit",
    "fields",
    "search",
    "coordinator",
    "country",
    "year",
    "month",
    "paid",
  ];
  let queryObj = { ...req.query };
  excludeFields.forEach((el) => {
    delete queryObj[el];
  });
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt|eq)\b/g,
    (match) => `$${match}`
  );
  queryObj = JSON.parse(queryStr);

  let query = pujaOrderModel.find().populate({
    path: "sponsor",
    populate: {
      path: "coordinator",
    },
  });
  // SEARCH
  if (req.query.search) {
    query = query.find({
      $or: [
        { id: { $regex: `${req.query.search}`, $options: "i" } },
        { pujaName: { $regex: `${req.query.search}`, $options: "i" } },
        { "sponsor.name": { $regex: `${req.query.search}`, $options: "i" } },
        { "sponsor.surname": { $regex: `${req.query.search}`, $options: "i" } },
      ],
    });
  }

  // checkFinsihed or not puja
  if (req.query.finished) {
    let currentDate = new Date().toISOString();
    if (req.query.finished == "true") {
      query = query.find({ endDate: { $lte: currentDate } });
    } else if (req.query.finished == "false") {
      query = query.find({ endDate: { $gte: currentDate } });
    }
  }

  // PAID
  if (req.query.paid) {
    query = query.find({ paid: req.query.paid });
  }
  // Coordinator
  if (req.query.coordinator) {
    query = query.find({ "sponsor.coordinator": req.query.coordinator });
  }
  //   country;
  if (req.query.country) {
    query = query.find({ "sponsor.country": req.query.country });
  }
  //   Year;
  if (req.query.year) {
    query = query.find({ year: { $eq: req.query.year } });
  }
  if (req.query.month) {
    query = query.find({ month: req.query.month });
  }

  // SORTING LOGIC
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // PAGINATION
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 30;
  const skip = (page - 1) * limit;

  const orderlistCount = await pujaOrderModel.countDocuments(query);
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    if (skip >= orderlistCount && orderlistCount > 0) {
      throw new Error("This page is not found");
    }
  }
  // -----------------------------------------

  const order = await query;

  res.status(200).json({
    length: orderlistCount,
    currentPage: Number(page),
    numberOffPages: Math.ceil(Number(orderlistCount) / limit),
    status: true,
    data: order,
  });
});
