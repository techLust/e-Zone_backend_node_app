const adminSignUpModel = require('../../models/admin/adminSignUpModel');

exports.updateAdminData = async(req, res) => {
    try {
        const adminId = req.params.id;
        const tbuData = req.body;
        const adminData = await adminSignUpModel.findByIdAndUpdate(adminId,tbuData);
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