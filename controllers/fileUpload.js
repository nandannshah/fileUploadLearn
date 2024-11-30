//This file upload method uploads file to the server then to media server and later delete the file from server
const { Types } = require('mongoose');
const File = require('../models/File');
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async (req, res)=>{
    try{
        const file = req.files.file;
        console.log("File-> ",file);

        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[2]}`; // This is the path of Server 
        console.log("Path-> ",path);
 
        file.mv(path, (error)=>{
            console.error(error);
        });

        res.status(200).json({
            success:true,
            message:'Local File Upload Successfully',
        })
    }
    catch(error){
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedFileTypes){
    return supportedFileTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    // Use file.tempFilePath for uploading to Cloudinary
    console.log(file.tempFilePath);
    options.resource_type = "auto"; 
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) =>{
    try{
        const{name, tag, email} = req.body;
        console.log(name, tag, email);

        const file = req.files.imageFile;
        console.log(file);
        
        //Validation
        const supportedFileTypes = ["jpg", "jpeg", "png"];  //How to check If file type is valid or not we create a function
        const fileType = file.name.split('.')[1].toLowerCase();

        console.log("FIle type->", fileType);

        if(!isFileTypeSupported(fileType, supportedFileTypes)){
            return res.status(400).json({
                success: false,
                message: "File type not supprted",
            })
        }

        //If File Format supported
        console.log("Entering file uploading to cloudinary");
        const response = await uploadFileToCloudinary(file, "learnCloudinary");
        console.log("Response->", response);

        //db mein save krna

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            message:'Image Successfully Uploaded'
        })



    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: "Something went wrong",
            details: error.message
        })
    }
}

exports.videoUpload = async(req, res) => {
    try{
        const {name, tag, email} = req.body;
        const file = req.files.videoFile;

        //validation
        const supportedFileTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        const maxFileSize = 50 * 1024 * 1024;
        console.log("File type->", fileType);


        if(!isFileTypeSupported(fileType, supportedFileTypes)){
            return res.status(400).json({
                success:false,
                message:'File type not supported',
            })
        }

        if (file.size > maxFileSize) {
            return res.status(400).json({
                success: false,
                message: 'File size exceeds limit of 50 MB',
            });
        }
        //Uploading to cloudinary
        console.log("Uploading file to cloudinary");
        const response = await uploadFileToCloudinary(file, "learnCloudinary");
        console.log("Response->", response);

        //Db mein entry save krni
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success:true,
            message:'Video Successfully Uploaded'
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message: 'File not uploaded'
        })
    }

}