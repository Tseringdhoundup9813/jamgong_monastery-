const mongoose = require("mongoose");

const pujaSchema = mongoose.Schema({
    
    image:{
        type:String,
        required:[true,'Image is required field!'],
        trim:true,

    },
    imageName:{
        type:String,
        required:[true,'Image Name is required fiedl!'],
        trim:true,

    },
    title:{
        type:String,
        required:[true,'Title is required field!'],
        trim:true,

    },
    
    durationAndPrice:[
        {
            duration:{
                type:String,
                required:[true,'Duration is required field!']

            },
            price:{
                type:Number,
                required:[true,'Price is required field!']

            }

        }
    ]

},{timestamps:true})

const pujaModel = mongoose.model('puja',pujaSchema)
module.exports = pujaModel;