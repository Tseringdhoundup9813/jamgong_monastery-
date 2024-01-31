
require('dotenv').config()

const express = require('express');
const app = express();
const customError = require('./utils/custome.error')
const globalErrorHandler = require("./controller/errorController")
// Routers
const coordinatorRoute = require('./routes/coordinator.routes')
const sponsorRoute = require('./routes/sponsor.routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ROUTE MIDDLEWARE
app.use('/api',coordinatorRoute,sponsorRoute)

// /
// API ENDPOINT NOT FOUND 
app.all('*',(req,res,next)=>{
    const err = new customError(`can't find ${req.originalUrl} on the server!`,404)
    next(err)
})

app.use(globalErrorHandler);




module.exports = app;