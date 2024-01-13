const coordinatorModels = require('../models/coordinator.model')

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