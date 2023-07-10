const mongoose = require('mongoose');

const vendorSignUpSchema = new mongoose.Schema(
    {
        // firstName: { type: String, required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phoneNumber: {type: String, required: true},
        role: { type: String, default: 'vendor' }
    },
    {
        timestamps: true,
    }
);

exports.VendorSignUpModel = mongoose.model('Vendor', vendorSignUpSchema);
