const Redis = require('redis')

//Pass URL endpoint for production in "createClient()"
const redisClient = Redis.createClient({
    host: '172.17.0.1',
    port: 6379,
})
redisClient.connect();
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => {
    console.log('Redis server connected');
})

module.exports = redisClient