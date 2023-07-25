const AWS = require("aws-sdk");
const fs = require("fs");
const { vendorProductModel } = require("../models/vendor/vendorProductModel");

exports.s3Uploader = async (file, body, userId) => {
  try {
    console.log("FILE", file, "ID", userId);
    const fileStream = fs.createReadStream(file.path);

    const {
      productName,
      productCategory,
      productFreshness,
      productDescription,
      productPrice,
      productComments,
    } = body;

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
        });
        console.log(product);
      } else console.log(err);
    });

    return { s3, params };
  } catch (error) {
    console.log(error);
  }
};
