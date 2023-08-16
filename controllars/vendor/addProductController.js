require('dotenv').config({ path: '../../.env' });
const { s3Uploader } = require('../../services/s3Uploader.services');
const fs = require('fs')

exports.addProduct = async (req, res) => {
    try {
        //Decode token
        const token = req.headers.token
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const buff = new Buffer(base64, 'base64');
        const payloadinit = buff.toString('ascii');
        const payload = JSON.parse(payloadinit);
        console.log("DECODED TOKEN", payload)

        const productDetails = await s3Uploader(req.file, req.body, payload.id);
        return res.status(200).json({ status: 'Product added successful', productDetails })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: 'Product added failed' })
    }
    finally {
        //delete file after upload successfully
        const filePath = `./uploads/`
        const files = fs.readdirSync(filePath)
        console.log(files, files.length)
        if (files.length > 0) {
            fs.unlink(filePath + files[0], (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('file deleted');
            })
        }
        console.log("Finally executed")
    }
}