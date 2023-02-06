const { VendorSignUpModel } = require('../../models/vendor/vendorSignUpModel');

exports.checkVendorEmail = async (req, res) => {
    try{
        const { email } = req.body;
        const vendorDetails = await VendorSignUpModel.findOne({email:email});
        console.log(vendorDetails)
        if(!(email == vendorDetails.email)) return res.status(500).json({status: 'Please enter valid email'})
        if(email === vendorDetails.email){
            return res.status(200).json({
                status: 'Vendor email matched',
                data: vendorDetails
            })
        }
    }catch(error){
        return res.status(500).json({status: 'Something went wrong'})
    }
}

exports.sendOTP = async (req, res) => {
    try{

    }catch(error){

    }
}

exports.verifyOTP = async (req, res) => {
    try{

    }catch(error){

    }
}

exports.updateVendorPassword = async (req, res) => {
    try{

    }catch(error){
        
    }
}