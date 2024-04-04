
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userModel = require("../models/user.model")
const asyncHandler = require('../utils/asyncErrorHandler')
const customeError = require("../utils/custome.error")


const signToken = id =>{
    return  jwt.sign({id},process.env.SECRET,{expiresIn:process.env.lOGIN_EXPIRES})
}



exports.createUser = asyncHandler(async(req,res,next)=>{

    const newUser = await userModel.create(req.body);
    const token = signToken(newUser._id)
    res.status(201).json({
        status:'success',
        message:"successfully created admin",
        token,
    })

})

exports.signIn = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;

    const userExits = await userModel.findOne({email}).select("+password");
    if(!userExits){
        const msg = `user with ${email} is not exits!`
        const err = new customeError(msg,401);
        return next(err);
    }
    const passwordMatched =bcrypt.compareSync(password,userExits.password)

    if(!passwordMatched){
        const err = new customeError('Incorrect Credential!',401)
        return next(err);
    }
    const token = signToken(userExits._id)

    res.status(200).json({
        status:'sucess',
        message:'successfully signin!',
        token,
    })


})