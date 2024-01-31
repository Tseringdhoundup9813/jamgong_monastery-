
require('dotenv').config()

const express = require('express');
const app = express();

// Routers
const coordinatorRoute = require('./routes/coordinator.routes')
const sponsorRoute = require('./routes/sponsor.routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ROUTE MIDDLEWARE

app.use('/api',coordinatorRoute,sponsorRoute)









module.exports = app;