const AWS = require('aws-sdk');
const fs = require('fs');

exports.s3Uploader = async (file) => {
    try {
        const fileStream = fs.createReadStream(file.path);

        const s3 = new AWS.S3({
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
        })
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${file.filename}`,
            Body: fileStream,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        // s3.upload(params, async (err, data) => {
        //     if (data) console.log("From s3 uploader",data);
        // })
       
        return {s3, params};

    } catch (error) {
        console.log(error);
    }
}