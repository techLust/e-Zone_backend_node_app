const mongoose = require('mongoose');

const vendorSignUpSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

exports.VendorSignUpModel = mongoose.model('Vendor', vendorSignUpSchema);
