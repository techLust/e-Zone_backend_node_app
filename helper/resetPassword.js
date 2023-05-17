const UserModel = require("../models/user/signUpUser");
const bcrypt = require('bcryptjs')

exports.resetPassword = async (req, res) => {
    try {
        //Fething email and password from body
        console.log("Reset password called", req.params.id)
        const { newPassword, confirmPassword } = req.body;
        const userId = req.params.id;

        console.log("reset password", userId, newPassword, confirmPassword)

        if (newPassword === confirmPassword) {
            let userPassword = confirmPassword;
            //Encrypting password
            const saltRounds = 8;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(userPassword, salt)

            const updatedPassDetails = await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

            res.status(200).json({
                status: 'success',
                message: 'Password reset successfully',
                isError: false,
            });
        } else {return res.json({ messae: 'Password not match' })}
    }
    catch (error) {
        console.log("Error message", error.message)
        return res.status(500).json({
            status: 'Failed',
            message: 'Failed to update password',
            isError: true,
        })
    }
}