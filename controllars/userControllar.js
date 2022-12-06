const UserModel = require('../models/signUpUserModel');

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