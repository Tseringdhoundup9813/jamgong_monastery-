
require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path')
// CORS
const cors = require('cors');
const multer = require('multer')
const upload = multer({des:'./public/files'})


const customError = require('./utils/custome.error')
const globalErrorHandler = require("./controller/errorController")
// Routers
const coordinatorRoute = require('./routes/coordinator.routes')
const sponsorRoute = require('./routes/sponsor.routes')
const pujaRoute = require("./routes/puja.routes")
const order = require("./routes/order.routes")
const category = require("./routes/category.routes")
const userRoute = require("./routes/user.routes")



app.use(express.json())
app.use(express.urlencoded({extended:true}))

// CORS
app.use(cors());


// STATIC FILES
// app.use("/static",express.static(path.join(__dirname,'public')));
app.use(express.static('public'))


// ROUTE MIDDLEWARE
app.use('/api',coordinatorRoute,sponsorRoute,pujaRoute,order,category)
app.use('/api/user',userRoute)

// /
// API ENDPOINT NOT FOUND 
app.all('*',(req,res,next)=>{
    const err = new customError(`can't find ${req.originalUrl} on the server!`,404)
    next(err)
})

app.use(globalErrorHandler);






module.exports = app;