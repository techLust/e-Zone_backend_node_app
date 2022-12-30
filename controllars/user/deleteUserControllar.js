const UserModel = require('../../models/user/signUpUser');

//*************// DELETE USER SERVICE /***********************/

exports.deleteUser = async(req,res) => {
    try{
        const userData = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: 'Deleted',
        });
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err,
        });
    };
};