
const app = require('./app.js')
const db = require('./db.js')

// CONNECTING TO MONGO_DB SERVER
db.connectDb();
// ------------------


// RUN SERVER_--------------------------
const port = process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})
// ------------------------------------------