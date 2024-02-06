
const pujaModel = require("../models/puja.model")
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const customError = require("../utils/custome.error")

exports.CreatePuja = asyncErrorHandler(async(req,res,next)=>{

        const {title,durationAndPrice} = req.body;
        console.log(durationAndPrice);
        if(req.file){
            const filePath = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`
            const newPuja = await pujaModel.create({image:filePath,title,durationAndPrice});  
            res.status(201).json({
                status:"Success",
                data:newPuja
            })
        }else{
            const err = new customError('Image is required field!',400)
            next(err)
        }
})