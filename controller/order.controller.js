
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const pujaOrderModel = require("../models/pujaOrder.model")
const selectedPujaModel = require("../models/selectedpuja.model")
const crypto  = require("crypto");


exports.OrderConfirm = asyncErrorHandler(async(req,res,next)=>{

    let {
        pujaId,sponsorId,pujaName,coordinatorCode,duration,
        cost,paid,startDate,endDate,dedicators,
        currency,actualAmount} = req.body;
    dedicators = JSON.parse(dedicators);
    
    const randome4Digit = crypto.randomInt(0,10**4-1).toString().padStart(4,"0");
    let pujaNameArray = pujaName.split(' ');

    // shorthen the puja name
    let  prayerShortForm = [];
    pujaNameArray.map((item)=>{
        prayerShortForm.push(item[0]);
    })
    prayerShortForm = prayerShortForm.join('');
    prayerShortForm = prayerShortForm.toUpperCase();

    let id = `${prayerShortForm}-${new Date().getFullYear()}-${new Date().getMonth()}-${randome4Digit}`;


    
    const createOrder = await pujaOrderModel.create({
        sponsorId,
        id,
        pujaName,coordinatorCode,
        duration,cost,paid,startDate,
        endDate,dedicators,
        currency,actualAmount
    });

    const selectedPujaList = await selectedPujaModel.findOne({sponsor:sponsorId})
    const removeFromSelectedPuja = await selectedPujaModel.updateOne({sponsor:sponsorId},{$pull:{selectedlist:{selectedPuja:pujaId}}});

    res.status(201).json({
        status:'success',
        message:`${pujaName} is confirm`
    })

})

exports.SponsorPujaOrderList = asyncErrorHandler(async(req,res,next)=>{
    const {id} = req.params;
    const orderlist = await pujaOrderModel.find({sponsorId:id});
    res.status(200).json({
        status:'success',
        data:orderlist
    })


})