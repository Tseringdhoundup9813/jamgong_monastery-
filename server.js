
const app = require('./app.js')
const db = require('./db.js')

// CONNECTING TO MONGO_DB SERVER
db.connectDb();
// ------------------


// RUN SERVER_--------------------------
const port = process.env.PORT||5000
const server = app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})
// ------------------------------------------

// handle unhandled reject ocurred
process.on('unhandledRejection',(err)=>{
    console.log(err.name,err.message);
    console.log("Unhandled rejection occured! shutting down")
    server.close(()=>{
        process.exit(1)

    })
})
