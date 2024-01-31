const sponsorModel = require("../models/sponsor.model")


exports.CreateSponsor = async(req,res)=>{
        try{
            const newSponsor = await sponsorModel.create(req.body);
            res.status(201).json({
                status:true,
                data:newSponsor
            })
            
        }catch(err){
            res.status(500).json({
                status:false,
                message:err.message
            })
        }
}


exports.GetAllSponsor = async(req,res)=>{
    try{
        const sponsor= await sponsorModel.find({});
        res.status(200).json({
            status:true,
            data:sponsor
        })
    }catch(err){
        res.status(500).json({
            status:false,
            message:err.message
        })
    }
}

exports.GetSingleSponsor = async(req,res)=>{
    const {id} = req.params;
    try{
        const sponsor = await sponsorModel.find({_id:id});

        res.status(200).json({
            status:true,
            data:sponsor
        })


    }catch(err){
        res.status(404).json({
            status:false,
            message:err.message
        })
    }
}