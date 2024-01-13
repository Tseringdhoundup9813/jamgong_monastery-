
require('dotenv').config()

const express = require('express');
const app = express();
const coordinatorRoute = require('./routes/coordinator.routes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ROUTE MIDDLEWARE

app.use('/api',coordinatorRoute)









module.exports = app;