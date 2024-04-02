

const mongoose = require('mongoose')

const sponsorSchema = mongoose.Schema({
    coordinator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Coordinator',
    },
    name:{
        type:String,
        trim:true,
        required:[true,'Name is required field!'],
        trim:true,
    },
    surname:{
        type:String,
        trim:true,
        trim:true,

    },

    country:{
        type:String,
        trim:true,
        required:[true,'country is required field!'],
        trim:true,

    },
    mailingAddress:{
        type:String,
        trim:true,
        required:[true,'country is required field!'],
        trim:true,

    },
    email:{
        type:String,
        trim:true,
        trim:true,

    },
    whatsApp:{
        type:String,
        trim:true,
        trim:true,

    },
    weChat:{
        type:String,
        trim:true,
        trim:true,

    },
    other:{
        type:String,
        trim:true,
        trim:true,

    },
    year:{
        type:Number,
        default:new Date().getFullYear(),
    },
    month:{
        type:Number,
        default:new Date().getMonth()+1
    },
    day:{
        type:Number,
        default:new Date().getDate()
    }

},{timestamps:true})



const sponsorModel = mongoose.model('Sponsor',sponsorSchema)
module.exports = sponsorModel