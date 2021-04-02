const { Router } = require('express');
const Upload = require('../models/Upload');
const UploadService = require('../services/UploadService');
const upload = require('../utils/amazon');
const deleteItem = require('../utils/amazonDelete');


const uploadSingle = upload.single('image');


module.exports = Router()
    .post('/file', uploadSingle, async (req, res, next) => {
        try { 
            const result = await UploadService.uploadSingleFile(req);
            res.send(result);
        } catch (error) {
            next(error);
        }
    })
    .delete('/file/:id', async (req, res, next) => {
        try {
            console.log('controller req params', req.params.id)
            const response = await UploadService.deleteSingleFile(req.params.id)
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get('/files', async (req, res, next) => {
        try {
            const response = await UploadService.getAllFiles();
            res.send(response);
        } catch (error) {
            next(error)
        }

    })
    .get('/files/:id', async (req, res, next) => {
        try {
            const response = UploadService.getOneFile(req.params.id);
            res.send(response);
        } catch (error) {
            next(error)
        }

    })