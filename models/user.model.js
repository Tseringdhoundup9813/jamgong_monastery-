const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        trim:true

    },
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        trim:true,
        minlength:5,
        select:false,

    },
    
    confirm:{
        type:String,
        required:[true,'Please enter your confirm password'],
        trim:true,
        validate:{
            validator:function(val){
                return val == this.password
            },
            message:'Password and confirm Password does not match!'
        }
    },
})

userSchema.pre('save',function(next){
    if(!this.isModified('password'))return next();
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(this.password,salt);
    this.password = hashPassword;
    this.confirm = undefined;
    next();

})

const userModel = mongoose.model('Admin',userSchema)
module.exports = userModel;