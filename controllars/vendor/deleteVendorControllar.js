const { VendorSignUpModel } = require('../../models/vendor/vendorSignUpModel');

exports.deleteVendor = async (req, res) => {
    try {
        const vendorId = req.params.id;
        const deletedVendorData = await VendorSignUpModel.findByIdAndDelete(vendorId);
        res.status(200).json({
            message: 'Vendor accunt deleted',
            data: deletedVendorData,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Something went wrong' });
    };
};