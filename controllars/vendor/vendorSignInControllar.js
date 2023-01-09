const { VendorSignUpModel } = require('../../models/vendor/vendorSignUpModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.vendorSignIn = async(req, res) => {
    try{
        console.log("Hi, user", req.body);
        const {email, password, role} = req.body;
        if(!(email && password && role)) return res.status(401).json({message: 'Enter valid credentials'});

        const vendor = await VendorSignUpModel.findOne({email: email});
        const matchedPassword = bcrypt.compare(password, vendor.password);
        if(!(email === vendor.email && matchedPassword)) res.status(401).json({message: "Credential not matched"});
        
        const token = jwt.sign({email: vendor.email},process.env.SECRET_ACCESS_KEY)
        res.status(200).json({
            status: 'login success',
            data: vendor,
            token: token,
        });

    }catch(error){
        console.log(error)
        res.status(401).json({message: 'Something went wrong'});
    };
};