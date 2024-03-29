const AWS = require("aws-sdk");
const fs = require("fs");
const { vendorProductModel } = require("../models/vendor/vendorProductModel");

exports.s3Uploader = async (file, body = null, userId = null) => {
  try {
    console.log("FILE", file, "ID", userId);
    const fileStream = fs.createReadStream(file.path);

      let productName
      let productCategory
      let productFreshness
      let productDescription
      let productPrice
      let productComments
      let quantity

      if(body){
        productName = body.productName
        productCategory = body.productCategory
        productFreshness = body.productFreshness
        productDescription = body.productDescription
        productPrice = body.productPrice
        productComments = body.productComments
        quantity = body.quantity
      }

    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
    });
    const params = {
      // Bucket: bucket-name/folder-name/folder-name2
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${file.filename}`,
      Body: fileStream, // Uploading as buffer
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    if(body){
    s3.upload(params, async (err, data) => {
      if (data) {
        const product = await vendorProductModel.create({
          userId: userId,
          productName,
          productCategory,
          productFreshness,
          productDescription,
          productPrice,
          productComments,
          url: data.Location,
          quantity: quantity
        });
        console.log(product);
      } else console.log(err);
    });

  }
    return { s3, params };
  } catch (error) {
    console.log(error);
  }
};
