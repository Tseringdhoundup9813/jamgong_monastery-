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

        const excludeFields = ['sort','page','limit','fields','search'];
        let queryObj = {...req.query};
        excludeFields.forEach(el=>{
            delete queryObj[el]
        })
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
        queryObj  = JSON.parse(queryStr)
        console.log(queryObj);

        let query= sponsorModel.find(queryObj).populate("coordinator");
        
        console.log(req.query);

        // SEARCH
        if(req.query.search){
            query = query.find({
                $or:[
                    {name:{$regex:req.query.search,$options:"i"}},
                    {email:{$regex:req.query.search,$options:"i"}}
                ]
            })
        }

        // SORTING LOGIC
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query = query.sort('-createdAt')
        }

        // PAGINATION
        const page = req.query.page*1 || 1;
        const limit = req.query.limit*1 ||10;
        const skip = (page-1)*limit;
        query = query.skip(skip).limit(limit)
        const moviesCount = await sponsorModel.countDocuments({});
        if(req.query.page){

            if(skip >= moviesCount){
                throw new Error('This page is not found')
            }
        }
        // -----------------------------------------
        const sponsor = await query;
        res.status(200).json({
            length:sponsor.length,
            currentPage:Number(page),
            numberOffPages:Math.ceil(moviesCount/limit),
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