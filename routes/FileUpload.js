const express = require('express');
const router = express.Router();

const{localFileUpload, imageUpload, videoUpload} = require('../controllers/fileUpload');


router.post('/localfileupload', localFileUpload);
router.post('/imagefileupload', imageUpload);
router.post('/videofileupload', videoUpload);

module.exports = router;