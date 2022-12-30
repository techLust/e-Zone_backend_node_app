const UserModel = require('../../models/user/signUpUser');


//******************// UPDATE USER SERVICE //*************** */

exports.updateUser = async(req,res) => {
    try{
        const userData = await UserModel.findByIdAndUpdate(req.params.id, req.body);
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
