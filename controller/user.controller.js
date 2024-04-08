
const bcrypt = require("bcrypt")
const util = require("util")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')

const userModel = require("../models/user.model")
const asyncHandler = require('../utils/asyncErrorHandler')
const customeError = require("../utils/custome.error")
const sendEmail = require('../utils/email')


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
    if(testToken&& testToken.startsWith('bearer')){
        token = testToken.split(' ')[1];
    
    }
    if(!token){
        next(new customeError('You are not logged in!',401))
    }
    const decodedToken = await jwt.verify(token,process.env.SECRET)
    const user = await userModel.findById(decodedToken.id)

    // USER EXIST OR NOT 
    if(!user){
        next(new customeError('The user with given token does not exist',401))
    }

    // Check password has change after token has given
    const isPasswordChange = user.isPasswordChange(decodedToken.iat)
    if(isPasswordChange){
        next(new customeError('The password has been change recently! please login again ',401))
    } 
    console.log(isPasswordChange);

    //ALL USER TO ACCESS ROUTE
    next();

    
    
})

exports.forgetPassword =asyncHandler(async(req,res,next)=>{
    const user = await userModel.findOne({email:req.body.email})

    if(!user){
        const error = new customeError('We could not find the user with given email',404);
        next(error);
    }
    const resetToken = user.createResetPasswordToken();
    await user.save({validateBeforeSave:false});

    // SEND THE TOKEN BACK TO THE USER EMAIL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/user/resetpassword/${resetToken}`
    const message = `We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\n This reset password link will be valid for 10 minutes`
    try{
        await sendEmail({
                email:user.email, 
                subject:"Password change request received",
                message:message    
            })
            res.status(200).json({
                status:'success',
                message:'password reset link send to the user email'
            })

    }catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save({validateBeforeSave:false})
        console.log(err);
        const error = new customeError('There was error sending passwordreset email.Please try again later ',500);
        return next(error);
    }
   
})

exports.resetPassword =asyncHandler(async(req,res,next)=>{
    const {password,confirm} = req.body;
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await userModel.findOne({passwordResetToken:token,passwordResetTokenExpires:{$gt:Date.now()}})
    if(!user){
        next(new customeError('Token is invalid or has expired!',400))
    }
    user.password = password;
    user.confirm = confirm;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangeAt = Date.now();
    user.save();
    const loginToken = signToken(user._id);
    res.status(201).json({
        status:'success',
        message:'successfully reset password',
        token:loginToken
    })
})
