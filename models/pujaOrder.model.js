const mongoose = require("mongoose")

const pujaOrderSchema = new mongoose.Schema({
    id:{
        type:String,
    },
    sponsorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sponsor',
        trim:true,

    },
    coordinator:{
        type:String,
        trim:true,

    },
    pujaName:{
        type:String,
        required:[true,'PujaName is required field!'],
        trim:true,

    },
    coordinatorCode:{
        type:String,
        trim:true,
        required:[true,'Coordinator Code is required field!'],
    },
    duration:{
        type:String,
        required:[true,'Duration is required field!'],
        trim:true,

    },
    cost:{
        type:Number,
        required:[true,'Cost is required field!'],

    },
    paid:{
        type:Boolean,
        default:false,
    
    },
    startDate:{
        type:Date,
        required:[true,'Start Date is required field!']
    },
    endDate:{
        type:Date,
        required:[true,'End Date is required field!']
    },
    dedicators:{
        type:Array,
    },
    currency:{
        type:String,
        required:[true,'Currency is required field!']
    },
    actualAmount:{
        type:Number,
        required:[true,'Actual Amount is required field!']
    }



},{timestamps:true})

const pujaOrderModel = mongoose.model("Order",pujaOrderSchema)
module.exports = pujaOrderModel

