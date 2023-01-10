const ForgotPassModel = require('../../models/user/userForgotPassModel');

exports.checkUserOTP = async (req, res) => {
    try {
        const { userOTP } = req.body;
        console.log(userOTP)
        if (!userOTP) { return res.status(401).json({ message: 'Check your OTP' }) };

        const userDetails = await ForgotPassModel.findOne({ OTP: userOTP });

        if (userOTP == userDetails.OTP) { return res.status(200).json({ status: "OTP verified" }) };

    } catch (error) {
        return res.status(500).json({ status: "Please enter valid OTP" });
    }
}