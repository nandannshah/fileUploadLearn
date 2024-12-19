const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//Post middlware
fileSchema.post("save", async function(doc) {
    try{
        //Transporter create
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
    }
    catch(error){
        console.error(error);
    }

    //Send mail
    let info = await transporter.sendMail({
        from:`Nandan`,
        to: doc.email,
        subject: "New file upload in cloudinary",
        html:`<h2>Hello </h2> <p>File Uploaded</p>`,
    })

    console.log("INFO", info)
})

const File = mongoose.model("File", fileSchema);
module.exports = File;