const {VendorSignUpModel} = require('../../models/vendor/vendorSignUpModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const saltRounds = 8;
const secretKey = process.env.SECRET_ACCESS_KEY;

exports.createVendor = async(req, res) => {
    try{
        const {fullName, email, password, phoneNumber} = req.body;
        // console.log(req.body)
        if(!(fullName && email && password && phoneNumber)) return res.status(401).json({message: 'Enter valid details'});

        const salt = await bcrypt.genSalt(saltRounds);
        const hasshedPassword = await bcrypt.hash(password, salt);

        const vendorData = new VendorSignUpModel({fullName, email, password: hasshedPassword, phoneNumber});
        
        const token = jwt.sign({
            id: vendorData._id,
        }, secretKey);

        await vendorData.save();

        res.status(200).json({
            message:'Vendor sign up successful',
            data: vendorData,
            token: token,
        });

    }catch(error){
        console.log(error)
        res.status(401).json({message: 'Someting went wrong'})
    };
};