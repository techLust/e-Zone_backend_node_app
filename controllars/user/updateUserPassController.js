const userSignUpModel = require('../../models/user/signUpUser');
const bcrypt = require('bcryptjs');

exports.updateUserPass = async (req, res) => {
    try {
        const { userEmail, newPass, confirmPass } = req.body;

        if (!(newPass === confirmPass)) return res.status(401).json({ status: 'Please enter same password' });

        const userDetails = await userSignUpModel.findOne({ email: userEmail });

        const existingPass = await bcrypt.compare(confirmPass, userDetails.password);

        if (existingPass) return res.status(401).json({ status: 'Last changed password is same' })

        if (!existingPass) {
            const updatedPass = userSignUpModel.findByIdAndUpdate(userDetails._id, { password: confirmPass })
            return res.status(200).json({ status: 'Password changed successful' })
        }

    } catch (error) { return res.status(401).json({ status: 'Something went wrong' }) }
}