const express = require('express');
const router = express.Router();

const{localFileUpload} = require('..//controllers/fileUpload');


router.post('/localfileupload', localFileUpload);

module.exports = router;