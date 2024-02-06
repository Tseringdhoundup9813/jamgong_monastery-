const coordinatorModels = require('../models/coordinator.model')
const asyncErrorHandler = require('../utils/asyncErrorHandler')


exports.GetAllCoordinator=async(req,res)=>{
    try{
        const coordinator = await coordinatorModels.find({});
        res.status(200).json({
            success:'true',
            length:coordinator.length,
            data:coordinator
        })
    }catch(err){
        res.status(500).json({
            success:'false',
            message:err.message,
        })
    }
}

exports.AddCoordinator = async(req,res)=>{
    try{
        const{code,name,address,country,email,whatsapp} = req.body;
    

        const saveCoordinator = await coordinatorModels.create({
            code,name,address,country,email,whatsapp
        })

        res.status(200).json({
            success:'true',
            message:'successfully created coordinator!'
        })

    }catch(err){
        res.status(500).json({
            success:'false',
            message:err.message,
        })
    }
}

exports.GetSingleCoordinator = asyncErrorHandler(async(req,res)=>{
        
        const {id} = req.params;

        const singleCoordinator = await coordinatorModels.find({_id:id});
        res.status(201).json({
            success:true,
            data:singleCoordinator
        })

})

exports.UpdateCoordinator = asyncErrorHandler(async(req,res)=>{

    const {id} = req.params;
    const update = await coordinatorModels.findOneAndUpdate({_id:id},req.body)
    res.status(200).json({
        success:true,
        message:'Successfully updated coordinator'
    })

})
exports.DeleteCoordinator = asyncErrorHandler(async(req,res)=>{

    const {id} = req.params;
    const deleteCoordinator= await coordinatorModels.findByIdAndDelete(id)
    res.status(204).json({
        success:true,
        message:'Successfully delete coordinator'
    })

})