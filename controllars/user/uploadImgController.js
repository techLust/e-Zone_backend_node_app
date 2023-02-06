const cloudinary = require('cloudinary').v2
const { vendorProductModel } = require('../../models/vendor/vendorProductModel');
require('dotenv');

exports.uploadImage = async (req, res) => {
    try {

        const sampleImg = req.file;
        console.log("image",sampleImg)
        const path = sampleImg.path;
        

        // if (!path) {
        //     return res.status(501).json({ 
        //         status:'Please upload a file',
        //         error: error.message,
        //  });
        // }

        cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
        });


        await cloudinary.uploader.upload(path, (err, data) => {
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
        console.log(error)
        return res.status(500).json({ 
            status:'Failed to upload image',
            error: error.message,
     });
    }
}