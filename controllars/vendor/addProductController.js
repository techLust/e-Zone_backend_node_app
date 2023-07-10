require('dotenv').config({path: '../../.env'});
const { s3Uploader } = require('../../services/s3Uploader.services');

    exports.addProduct = async (req, res) => {
        console.log("BODY", req.body)
        console.log("HEADER", req.headers.token)

        try{        
            //Decode token
            const token = req.headers.token
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const buff = new Buffer(base64, 'base64');
            const payloadinit = buff.toString('ascii');
            const payload = JSON.parse(payloadinit);
            console.log("DECODED TOKEN", payload)

            await s3Uploader(req.file, req.body, payload.id);
            return res.status(200).json({
                status: 'Product added successful',
            })
    
        }catch(err){
            return res.status(500).json({status: 'Product added failed'})
        }
    }