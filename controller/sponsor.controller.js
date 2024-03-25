const sponsorModel = require("../models/sponsor.model")
const asyncErrorHandler = require('../utils/asyncErrorHandler')

exports.CreateSponsor = asyncErrorHandler(async(req,res)=>{
    const newSponsor = await sponsorModel.create(req.body);
    res.status(201).json({
            status:'success',
            message:'successfully create sponsor',
            data:newSponsor,
        
    })
            
        
})




exports.GetAllSponsor = asyncErrorHandler(async(req,res,next)=>{

        const sponsor= await sponsorModel.find({}).populate("coordinator");
        console.log(sponsor);
        res.status(200).json({
            status:true,
            data:sponsor
        })

});

exports.GetSingleSponsor = asyncErrorHandler(async(req,res,next)=>{
    const {id} = req.params;
    const sponsor = await sponsorModel.find({_id:id});
    res.status(200).json({
            status:true,
            data:sponsor
        })

})