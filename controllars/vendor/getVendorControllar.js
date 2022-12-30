const { VendorSignUpModel } = require('../../models/vendor/vendorSignUpModel');

//****************// RETRIEVE VENDOR SERVICE //************* */ */
exports.getVendorData = async (req, res) => {
    try {
        const vendorData = await VendorSignUpModel.find();
        res.status(200).json({ message: 'All vendor data', data: vendorData });

    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'Something went wrong'
        })
    }
}