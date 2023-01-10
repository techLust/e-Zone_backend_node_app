const userSignUpModel = require('../../models/user/signUpUser');
const bcrypt = require('bcryptjs');

exports.updateUserPass = async (req, res) => {
    try{
        const {userEmail, oldPass, newPass } = req.body;
        console.log(req.body)
        const userDetails = await userSignUpModel.findOne({email: userEmail});
        console.log(userDetails.password)

        const existingPass = await bcrypt.compare(oldPass, userDetails.password)
        if(existingPass) console.log("Last changed password is same");

        if(!existingPass){
            const updatedPass = userSignUpModel.findByIdAndUpdate(userDetails._id, {password: newPass})
            console.log('Password updated')
        }



    }catch(error){
        console.log(error);
    }
    res.send("Hi user");
}