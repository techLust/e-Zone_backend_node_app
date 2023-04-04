const { s3Uploader } = require('../../services/s3Uploader.services')

exports.uploadImageToS3 = async (req, res) => {
    try{
        const {s3, params} = await s3Uploader(req.file);
        s3.upload(params, (err, data) => {
            if(data) console.log('Success from controller',data)
            else console.log(err)
        })
    }catch(err){
        console.log(err)
    }





    // try {

    //     const file = req.file;
    //     // return
    //  const s3 = new AWS.S3({
    //     accessKeyId: process.env.S3_ACCESS_KEY_ID,
    //     secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
    //  })

    //     const params = {
    //         // Bucket: 'products-image',
    //         Bucket: process.env.S3_BUCKET_NAME,
    //         Key: `${file.filename}`,
    //         Body: `${file}`
    //     };
        
    //     s3.upload(params, (error, data) => {
    //         if(error) console.log(error);
    //         else console.log("Success", data)
    //     })

    // } catch (error) {
    //     console.log(error)
    // }
}