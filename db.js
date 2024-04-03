
const mongoose = require('mongoose');
//Set up default mongoose connection

exports.connectDb =()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to MongoDb')
    })
}
