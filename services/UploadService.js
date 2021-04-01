const upload = require('../lib/utils/amazon');
const Upload = require('../lib/models/Upload');

const uploadSingle = upload.single('image');

module.exports = class UploadService {

    static async uploadSingleFile(req, res) {        
        const response = await uploadSingle(req, res, (err) => {
            res.json({url: req.file.location})
            console.log("url", req.file.location, 'name', req.body.name, 'type', req.file.contentType, 'timeStamp', req.file.key)
            const upload = Upload.insert({url: req.file.location, });
        })
        
        // const result = await res.json({'url': req.file.location })
        // console.log('line 12')




    }
    
    
}