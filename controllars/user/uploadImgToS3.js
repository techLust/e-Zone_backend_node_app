const AWS = require('aws-sdk');
require('dotenv');

exports.uploadImageToS3 = async (req, res) => {
    try{

        const file = req.file;
console.log("File", file);

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKeyId: process.env.S3_ACCESS_KEY_SECRET
});

const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    key: `${file}`,
    Body: ''
};

s3.upload(params, (err, data) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log(data);
    }
})
    }catch(error){
        console.log(error)
    }
}