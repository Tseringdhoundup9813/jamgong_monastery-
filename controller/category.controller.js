
const sponsorModel  = require("../models/sponsor.model")
const asyncErrorHandler = require("../utils/asyncErrorHandler")


exports.GetCountry = asyncErrorHandler(async(req,res,next)=>{

    const response = await  sponsorModel.find().distinct('country');
    res.status(200).json({
        status:'success',
        data:response
    })
})
exports.GetYear = asyncErrorHandler(async(req,res,next)=>{
    const response = await sponsorModel.find().distinct('createdAt');
    res.status(200).json({
        status:'success',
        data:response,
    })
})