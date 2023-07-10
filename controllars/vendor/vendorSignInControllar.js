const { VendorSignUpModel } = require('../../models/vendor/vendorSignUpModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.vendorSignIn = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!(email && password)) return res.status(401).json({ message: 'Enter valid credentials' });

        const vendor = await VendorSignUpModel.findOne({ email: email });
        const matchedPassword = bcrypt.compare(password, vendor.password);

        if (!(email === vendor.email && matchedPassword)) res.status(401).json({ message: "Credential not matched" });

        const token = jwt.sign({ id:vendor._id }, process.env.SECRET_ACCESS_KEY)

        return res
        .cookie('accessToken', token, {httpOnly: true})
        .status(200)
        .json({
            status: 'You are logged in successfully',
            data: vendor,
            token: token,
        });

        

    } catch (error) { res.status(401).json({ message: 'Something went wrong' }) };
};