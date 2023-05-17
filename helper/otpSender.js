const UserModel = require('../models/user/signUpUser');
const redisClient = require('../config/redis-server');
const mailService = require('../services/mail.services');

exports.sendOTOP = async (req, res) => {
    try {
        const { email } = req.body;
        //If key and value are same pass any one of them.
        const userDetails = await UserModel.findOne({ email })
        if (userDetails.length == 0) return res.status(501).json({
            message: 'No user found',
            isError: true,
        });

        const OTP = Math.floor(1000 + Math.random() * 9000);
        redisClient.setEx('otp', 5 * 60, OTP.toString());

        const message = `<p>Your one time password is: ${OTP} </p>`

        mailService.sendMail(email, "Verify you OTP", message);

        res.status(200).json({
            status: 'success',
            message: 'OTP sent check your registered email',
            isError: false,
            userDetails: userDetails,
        })

    } catch (err) {
        res.status(500).json({
            message: 'Failed to send OTP',
            isError: true,
        })
    }
}