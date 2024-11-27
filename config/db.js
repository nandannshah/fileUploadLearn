const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDb = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("Database connected succesfully")})
    .catch((error)=>{
        console.log("Error in connecting database");
        console.error(error);
        process.exit(1);
    });
};