const express = require('express');
const app = express();
require('dotenv').config();


//Port find krna
const port = process.env.PORT || 3000

//middleware use krna parse krne ke liye aur filupload middleware
app.use(express.json());  
const fileupload = require('express-fileupload');  //This file uploD method upload on server
app.use(fileupload());

//database se connect krna hai

const db = require('./config/db');
db.connectDb();

//cloud se connect krna hai
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//APi route mount krne hai

app.use('api/v1/upload', Upload);

//activate server
app.listen(port, ()=>{
    console.log(`Server is running on port no ${port}`);
})
