const jwt = require('jsonwebtoken');
const UserModel = require('../models/user/signUpUser');
require('dotenv').config();

//********// VERIFY TOKEN MIDDLEWARE //************ */
exports.verifyToken = (req, res, next) => {
    try{
    const secretKey = process.env.SECRET_ACCESS_KEY;
    const token = req.headers.token;
    // console.log("Token from auth", token)
    if(!token) return res.status(501).josn({message: "No token provided"});

    //VERIFYING TOKEN
    jwt.verify(token, secretKey, async (err, decode) => {
        if(err) return res.status(403).json({message: "Invalid token"});
        const userDetails = await UserModel.findById(decode.id);
        req.user = userDetails;
        console.log("From AUTH", req.user)
        next();
    });
}catch(err){
    console.log('AUTH #########################################################',err)
}
};