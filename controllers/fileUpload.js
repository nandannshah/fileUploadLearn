//This file upload method uploads file to the server then to media server and later delete the file from server
const File = require('../models/File');

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
