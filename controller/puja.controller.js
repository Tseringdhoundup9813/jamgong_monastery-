const fs = require("fs");
const path = require("path");

const pujaModel = require("../models/puja.model");
const pujaSelectModel = require("../models/selectedpuja.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const selectedpujaModel = require("../models/selectedpuja.model");
const customError = require("../utils/custome.error");

exports.CreatePuja = asyncErrorHandler(async (req, res, next) => {
  const { title, durationAndPrice } = req.body;

  const durationAndPriceArray = JSON.parse(durationAndPrice);
  if (req.file) {
    const filePath = `${req.protocol}://${req.get("host")}/files/${
      req.file.filename
    }`;
    console.log(filePath);
    const newPuja = await pujaModel.create({
      image: filePath,
      title,
      durationAndPrice: durationAndPriceArray,
      imageName: req.file.filename,
    });
    res.status(201).json({
      status: "Success",
      data: newPuja,
    });
  } else {
    const err = new customError("Image is required field!", 400);
    next(err);
  }
});

exports.GetSinglePuja = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const response = await pujaModel.findOne({ _id: id });
  if (!response) {
    const error = new customError(`puja with ${id} ID is not found!`, 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    data: response,
  });
});

exports.GetAllPuja = asyncErrorHandler(async (req, res, next) => {
  const getAllPuja = await pujaModel.find({}).sort({ createdAt: -1 });
  res.status(200).json({
    status: true,
    data: getAllPuja,
  });
});

exports.DeletePuja = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const exits = await pujaModel.findOne({ _id: id });
  if (!exits) {
    const err = new CustomError(`puja with ${id} ID is not found!`, 404);
    return next(err);
  }
  const imageName = exits.imageName;

  // CHECK IMAGE IS ExIST ON SERVER
  fs.stat(`public/files/${imageName}`, async function (err, stat) {
    if (err == null) {
      // IMAGE IS EXISTS ON SERVER THEN DELETE IMAGE
      fs.unlink(`public/files/${imageName}`, async function (err) {
        if (err) {
          const err = new customError("server error", 500);
          next(err);
        }
        await pujaModel.deleteOne({ _id: id });
      });
      // IF IMAGE IS NOT EXIST ON SERVER THEN REMOVE FROM DATABASE
    } else if (err.code == "ENOENT") {
      await pujaModel.deleteOne({ _id: id });
    }
  });

  res.status(200).json({
    status: true,
    message: "Successfully delete puja",
  });
});

// SELECTING
exports.SelectedPujaList = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const checkSponsorExits = await pujaSelectModel.findOne({ sponsor: id });

  if (checkSponsorExits) {
    await pujaSelectModel.updateOne(
      { sponsor: id },
      { selectedlist: req.body }
    );
  } else {
    await pujaSelectModel.create({ sponsor: id, selectedlist: req.body });
  }
  res.status(201).json({
    status: "success",
    message: "success",
  });
});

exports.GetSelectedPujaList = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await selectedpujaModel.findOne({ sponsor: id });
  const list_of_puja_id = [];
  response.selectedlist.map((item) => {
    list_of_puja_id.push(item.selectedPuja);
  });
  const pujalist = await pujaModel.find({ _id: list_of_puja_id });
  res.status(200).json({
    status: "success",
    data: pujalist,
  });
});
