const { vendorProductModel } = require('../../models/vendor/vendorProductModel');
const Redis = require('redis')

//Pass URL endpoint for production in "createClient()"
const redisClient = Redis.createClient({
    host: 'localhost',
    port: 6379,
})
redisClient.connect();
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => {
    console.log('Redis server connected');
})

const EXPIRATION_TIME = 3600;

exports.getProducts = async (req, res) => {
    try {
        let productListCount = 0;
        console.log("Requested")
        //Retrieving data from redis cache database
        const productLists = await redisClient.get('productList')
        
        console.log('Inside get')
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
            redisClient.setEx('productListCount', EXPIRATION_TIME, productListCount.toString())
            
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