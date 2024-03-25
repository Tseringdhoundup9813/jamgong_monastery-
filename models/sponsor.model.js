

const mongoose = require('mongoose')

const sponsorSchema = mongoose.Schema({
    coordinator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Coordinator',
    },
    name:{
        type:String,
        trim:true,
        required:[true,'Name is required field!']
    },
    surname:{
        type:String,
        trim:true,
    },

    country:{
        type:String,
        trim:true,
        required:[true,'country is required field!']
    },
    mailingAddress:{
        type:String,
        trim:true,
        required:[true,'country is required field!']
    },
    email:{
        type:String,
        trim:true,
    },
    whatsApp:{
        type:String,
        trim:true,
    },
    weChat:{
        type:String,
        trim:true,
    },
    other:{
        type:String,
        trim:true,
    }

},{timeStamps:true})

const sponsorModel = mongoose.model('Sponsor',sponsorSchema)
module.exports = sponsorModel