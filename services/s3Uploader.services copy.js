const AWS = require('aws-sdk');
const fs = require('fs');
const { vendorProductModel } = require('../models/vendor/vendorProductModel');

exports.s3Uploader = async (file, body) => {
    try {
        const fileStream = fs.createReadStream(file.path);

        const { productName, productPrice, productDescription } = body;

        const s3 = new AWS.S3({
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
        })
        const params = {
            // Bucket: bucket-name/folder-name/folder-name2
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${file.filename}`,
            Body: fileStream, // Uploading as buffer
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        s3.upload(params, async (err, data) => {
            if (data) {
                const product = await vendorProductModel.create({ productName, productPrice, productDescription, url: data.Location });
                productDetails = product;
                console.log(data)
            }
            else console.log(err)
        })

        return { s3, params };

    } catch (error) {
        console.log(error)
    }
}