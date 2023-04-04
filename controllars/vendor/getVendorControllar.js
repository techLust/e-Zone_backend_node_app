const app = require('express')
const { VendorSignUpModel } = require('../../models/vendor/vendorSignUpModel');

//****************// RETRIEVE VENDOR SERVICE //************* */ */
exports.getVendorData = async (req, res) => {
    try {
        const vendorData = await VendorSignUpModel.find();
        return res.status(200).json({ 
            message: 'All vendor data',
             data: vendorData,
             });

    } catch (error) {
        return res.status(401).json({
            message: 'Something went wrong'
        })
    }
};

// Find vendor by ID
exports.getVendorDetailsById = async (req, res) => {
    try{
        const vendorId = req.params.id;
        const vendorDetails = await VendorSignUpModel.findById(vendorId)
        return res.json({status: 'Success', data: vendorDetails})
    }
    catch(error){
        res.status(401).json({message: 'Vendor details not found'})
    }
}