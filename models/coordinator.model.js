const mongoose = require('mongoose')

const CoordinatorScheme = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required field!'],
        trim:true,
    },

    code:{
        type:String,
        required:[true,'Code is required field!'],
        trim:true,
        unique:[true,'Code is already added!']
    },
    address:{
        type:String,
        required:[true,'Address is required field!'],
        trim:true,
    },
    country:{
        type:String,
        required:[true,'Country is required field!'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'Email is required field!'],
        trim:true,
    },
    whatsapp:{
        type:String,
        required:[false],
        trim:true,
    }


})

module.exports = mongoose.model('Coordinator',CoordinatorScheme)