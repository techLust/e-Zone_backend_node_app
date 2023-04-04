const UserModel = require('../../models/user/signUpUser');
const redisClient = require('../../config/redis-server');

//******************// UPDATE USER SERVICE //*************** */

exports.updateUser = async(req,res) => {
    try{
        const userOTP = req.body.otp
        if(userOTP){
            const savedOTP = await redisClient.get('otp');
            if(savedOTP != userOTP) return res.status(501).json({'message': 'OTP does not matched'})
        }
        console.log(req.body);
        const userData = await UserModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: userOTP ? 'OTP validated' : 'User updated successful',
            user: userData,
        });
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err,
        });
    };
};
