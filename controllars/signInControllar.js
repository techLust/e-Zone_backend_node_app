const UserModel = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signIn = async(req,res) => {
    try{
    const { email, password } = req.body;
    if(!email) return res.status(401).json({message: "Email not found"});
    if(!password) return res.status(401).json({message: "Password not found"});

    const user = await UserModel.findOne({email: email});
    if(email !== user.email) return res.status(401).json({message: "unauthorized email/password"});

    const isPasswordMatched = bcrypt.compare(password, user.password)
    if(!isPasswordMatched) return res.status(401).json({message: "unauthorized email/password"});
    
    //GENERATION TOKEN
    const secretKey = process.env.SECRET_ACCESS_KEY
    const token = jwt.sign({ email: user.email, password: user.password}, secretKey);
    res.status(200).json({
        message:"signin successful",
        token: token,
        user: user,
    })
    
    }catch{
        res.status(500).json({
            message: "Unable to sign in",
        })
    }
}