const { vendorProductModel } = require('../../models/vendor/vendorProductModel');
const fs = require('fs');
const formidable = require('formidable');
// const path = require('path')

exports.addProduct = async (req, res) => {
    try{
  
        // console.log("Body", req.body);
        // let imgPath = req.body.upload.split('\\');
        // console.log(imgPath[1] + "/" +imgPath[2])

        const { productName, productPrice, productDescription } = req.body;

        const productDetails = await vendorProductModel.create({productName, productPrice, productDescription});
        
        return res.status(200).json({
            status: 'Product added successfully',
            data: productDetails,
        })

    }
    catch(error) {
        console.log(error)
        res.status(500).json({
            status: 'Product add failed',
            error: error.message
        })
    }
}