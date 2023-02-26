require('dotenv').config({path: '../../.env'});
const { s3Uploader } = require('../../services/s3Uploader.services')

    exports.addProduct = async (req, res) => {
        try{        
            await s3Uploader(req.file, req.body);
            return res.status(200).json({
                status: 'Product added successful',
            })
    
        }catch(err){
            return res.status(500).json({status: 'Product added failed'})
        }
    }