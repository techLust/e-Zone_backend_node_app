const redisClient = require('../config/redis-server');

exports.checkUserOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        console.log("OTP", otp)
        if (!otp) {
            return res.status(401).json({
                message: 'Enter your OTP',
                isError: false,
            })
        };
        const verifiedOtp = await redisClient.get('otp')
        if (otp == verifiedOtp) {
            return res.status(200).json({
                status: "success",
                message: 'OTP verified',
                isError: false,
            })
        };

    } catch (error) {
        return res.status(500).json({
            status: "Please enter valid OTP",
            error: error.message,
            isError: true,
        })
    }
}