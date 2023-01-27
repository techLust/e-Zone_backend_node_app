const cloudinary = require('cloudinary').v2
require('dotenv');
const { vendorProductModel } = require('../../models/vendor/vendorProductModel');

exports.uploadImage = async (req, res) => {
    try {
        const sampleImg = req.file;
        const path = sampleImg.path;
        console.log(path);

        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
        });


        await cloudinary.uploader.upload(path, (err, data) => {
            console.log(data)
            if (data) {
                const productDetails = vendorProductModel({
                    assetId: data.asset_id,
                    filename: data.original_filename,
                    format: data.format,
                    url: data.url,
                });

                productDetails.save();

                return res.status(200).json({
                    status: 'File upload successful',
                    fileDetails: productDetails,
                });
            }
        });

    } catch (error) {
        return res.status(500).json({ status: error.message });
    }
}