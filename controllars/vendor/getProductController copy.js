const { vendorProductModel } = require('../../models/vendor/vendorProductModel');
const redisClient = require('../../config/redis-server')

const EXPIRATION_TIME = 3600;

exports.getProducts = async (req, res) => {
    try {
        console.log("Requested")
        //Retrieving data from redis cache database
        const productLists = await redisClient.get('productList')
        
        if (productLists != null) {
            console.log('Cache hit')
            return res.status(200).json({
                status: 'Retrieved product list',
                data: JSON.parse(productLists),
            })
        } else {
            console.log('Cache miss')
            const productLists = await vendorProductModel.find();
            console.log(productLists);
            productListCount = productLists.length;
            //Storing data into redis cache database(key, expiration time)
            redisClient.setEx('productList', EXPIRATION_TIME, JSON.stringify(productLists))

            res.status(200).json({
                status: 'Retrieved product list',
                data: productLists,
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'Failed to retrieve products' })
    }
}   