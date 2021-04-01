const { Router } = require('express');
const UploadService = require('../../services/UploadService');


module.exports = Router()
    .post('/file', uploadSingleFile, async (req, res, next) => {
        try { 

            UploadService.uploadSingleFile(req, res);

        } catch (error) {
            next(error);
        }
    })