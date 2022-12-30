const adminSignUpModel = require('../../models/admin/adminSignUpModel');

exports.getAdminData = async(req, res) => {
    try {
        const adminId = req.params.id;
        const adminData = await adminSignUpModel.find(adminId);
        return res.status(200).json({
            message: 'success',
            data: adminData,
        });
    }catch(error) {
        console.log(error);
        return res.status(401).json({
            message: 'Something went wrong',
        });
    };   
};