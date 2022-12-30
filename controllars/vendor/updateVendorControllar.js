const { VendorSignUpModel } = require('../../models/vendor/vendorSignUpModel');

exports.updateVendorData = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const tbuData = req.body;
        const updatedData = await VendorSignUpModel.findByIdAndUpdate(vendorId, tbuData);

        return res.status(200).json({
            status: 'success',
            data: updatedData,
        });

    } catch (error) {
        return res.status(401).json({
            message: 'Something went wrong',
        });
    };
};