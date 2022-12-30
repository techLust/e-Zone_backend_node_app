const {VendorSignUpModel} = require('../../models/vendor/vendorSignUpModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const saltRounds = 8;
const secretKey = process.env.SECRET_ACCESS_KEY;

exports.createVendor = async(req, res) => {
    try{
        const {firstName, lastName, email, password, role} = req.body;
        if(!(firstName && lastName && email && password && role)) return res.status(401).json({message: 'Enter valid details'});

        const salt = await bcrypt.genSalt(saltRounds);
        const hasshedPassword = await bcrypt.hash(password, salt);

        const vendorData = new VendorSignUpModel({firstName, lastName, email, password: hasshedPassword, role});
        
        const token = jwt.sign({
            email: vendorData.email,
        }, secretKey);

        await vendorData.save();

        res.status(200).json({
            message:'success',
            data: vendorData,
            token: token,
        });

    }catch(error){
        console.log(error)
        res.status(401).json({message: 'Someting went wrong'})
    };
};