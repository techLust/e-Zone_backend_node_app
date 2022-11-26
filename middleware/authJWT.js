const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();


//********// VERIFY TOKEN MIDDLEWARE //************ */

exports.verifyToken = (req, res, next) => {

    //FETCHING SECRET KEY ANG TOKEN
    const secretKey = process.env.SECRET_ACCESS_KEY;
    const token = req.headers.token;
    if(!token) return res.status(403).josn({message: "No token provided"});

    //VERIFYING TOKEN
    jwt.verify(token, secretKey, (err, decode) => {
        if(err) return res.status(403).json({message: "Invalid token"});
        req.userId = decode.id;
    });  

next();

};