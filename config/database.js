const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'Mahatab',
    pass: '123',
    authSource: 'admin'
})
.then(() => console.log('MongoDB database connected'))
.catch(error => console.log(error.message));