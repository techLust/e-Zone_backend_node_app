const mailService = require('../../services/mail.services');
const redisClient = require('../../config/redis-server');

exports.checkUserOTP = async (req, res) => {
    try {
        const { userOTP } = req.body;

        if (!userOTP) { return res.status(401).json({ message: 'Enter your OTP' }) };

        const userDetails = await ForgotPassModel.findOne({ OTP: userOTP });

        if (userOTP == userDetails.OTP) { return res.status(200).json({ status: "OTP verified" }) };

    } catch (error) { return res.status(500).json({ status: "Please enter valid OTP" }) }
}