const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    authSource: 'admin'
})
.then(() => console.log('MongoDB database connected'))
.catch(error => console.log(error.message));