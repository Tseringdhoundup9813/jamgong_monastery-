
const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
    
        selectedPuja:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'puja'
        }
})

const selectedPujaSchema =new mongoose.Schema({
        sponsor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Sponsor',
        },
        selectedlist:[subSchema]
})

module.exports = mongoose.model('pujaselected',selectedPujaSchema)