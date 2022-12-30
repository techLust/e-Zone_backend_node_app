const UserModel = require('../../models/user/signUpUser');

//******************// RETRIEVE USER SERVICE //**************** */

exports.getUser = async(req, res) => {
    try{
        const userData = await UserModel.find();
        res.status(200).json({
            status: 'Success',
            data: userData,
        });
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err,
        });
    };
};
