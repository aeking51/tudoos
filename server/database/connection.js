const mongoose = require('mongoose');

//DB Connection File
const connectDB = async()=>{
    try{
        //mongoose connection trying
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo DB Connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB