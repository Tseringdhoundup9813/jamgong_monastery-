const { sponsorModel } = require("../models/sponsor.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/custome.error");

exports.CreateSponsor = asyncErrorHandler(async (req, res) => {
  const newSponsor = await sponsorModel.create(req.body);
  res.status(201).json({
    status: "success",
    message: "successfully create sponsor",
    data: newSponsor,
  });
});

exports.GetAllSponsor = asyncErrorHandler(async (req, res, next) => {
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

  let query = sponsorModel.find(queryObj).populate("coordinator");

  // SEARCH
  if (req.query.search) {
    query = query.find({
      $or: [
        { name: { $regex: `${req.query.search}`, $options: "i" } },
        { surname: { $regex: `${req.query.search}`, $options: "i" } },
        { sponsor: { $regex: `${req.query.search}`, $options: "i" } },
      ],
    });
  }

  // Coordinator
  if (req.query.coordinator) {
    query = query.find({ coordinator: req.query.coordinator });
  }
  // country
  if (req.query.country) {
    query = query.find({ country: req.query.country });
  }
  // Year
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
    // query = query.sort('-createdAt')
  }

  // PAGINATION
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 30;
  const skip = (page - 1) * limit;

  const moviesCount = await sponsorModel.countDocuments(query);
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    if (skip >= moviesCount && moviesCount > 0) {
      throw new Error("This page is not found");
    }
  }
  // -----------------------------------------

  const sponsor = await query;

  res.status(200).json({
    length: moviesCount,
    currentPage: Number(page),
    numberOffPages: Math.ceil(Number(moviesCount) / limit),
    status: true,
    data: sponsor,
  });
});

exports.GetSingleSponsor = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const sponsor = await sponsorModel.findOne({ _id: id });
  if (!sponsor) {
    const err = new CustomError(`Sponsor with ${id} ID is not found!`, 404);
    return next(err);
  }

  res.status(200).json({
    status: true,
    data: sponsor,
  });
});
