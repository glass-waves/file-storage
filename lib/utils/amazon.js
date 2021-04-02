require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    region: process.env.AWS_SES_REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'glasswavs1',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DATA!' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});


module.exports = upload;
