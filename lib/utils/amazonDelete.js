require('dotenv').config();
const aws = require('aws-sdk');


aws.config.update({
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    region: process.env.AWS_SES_REGION,
});
const s3 = new aws.S3();

const deleteItem = (bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Delete: {
            Objects: [
                {
                    Key: `${key}`
                },
            ]
        }
    }
    s3.deleteObjects(params, (err, data) => {
        if(err) console.log(err, err.stack)
        // else console.log(data);
    })

}
module.exports = deleteItem;