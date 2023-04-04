const UserModel = require('../../models/user/signUpUser');
const redisClient = require('../../config/redis-server');
const mailService =require('../../services/mail.services');

exports.updateEmail = async (req, res) => {
    try{
        const { email } = req.body;
        //If key and value are same pass any one of them.
        const userDetails  = await UserModel.find({email})
        if(userDetails.length == 0) return res.status(501).json({message: 'No user found',isError: true});

        const OTP = Math.floor(1000 + Math.random() * 9000);
        redisClient.setEx('otp', 6*60, OTP.toString());

        const message = `<p>Your one time password is: ${OTP} </p>`

        mailService.sendMail(email, "Verify OTP", message);

        res.status(200).json({message: 'OTP sent to you mail', isError: false})

    }catch(err){
        console.log(err)
    }
}