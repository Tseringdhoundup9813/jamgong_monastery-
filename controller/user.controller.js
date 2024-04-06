
const bcrypt = require("bcrypt")
const util = require("util")
const jwt = require("jsonwebtoken")

const userModel = require("../models/user.model")
const asyncHandler = require('../utils/asyncErrorHandler')
const customeError = require("../utils/custome.error")
const CustomError = require("../utils/custome.error")


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

exports.protect = asyncHandler(async(req,res,next)=>{
    const testToken = req.headers.authorization;
    let token;
    if(testToken &&testToken.startsWith('bearer')){
        token = testToken.split(" ")[1];
    }
    if(!token){
        next(new customeError('You are not logged in!',401))
    }
    const decodedToken =await jwt.verify(token,process.env.SECRET);
    const userExits = await userModel.findById(decodedToken.id);
    if(!userExits){
        const error = new customeError("The user with the given token does not exits",401);
        next(error);
    }
    const isPasswordChanged = await userExits.isPasswordChange(decodedToken.iat)

    if(isPasswordChanged){
        const error = new customeError('The password has been changed recently. Please login again ',401);
        return next(error);
    }
    next();
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGVlMzhmYjA2OTZkM2JhNGU5MGMyNSIsImlhdCI6MTcxMjQwNTMzMCwiZXhwIjoxNzE0OTk3MzMwfQ.ryrxWBc6gzPV68cMWZ7aVSCuPVEi_g9NQ10noZuBsCA
