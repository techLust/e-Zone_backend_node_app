const mongoose = require('mongoose');

const ForgetPassSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    OTP: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
});

const ForgotPassModel = mongoose.model('UserForgotPass', ForgetPassSchema);
module.exports = ForgotPassModel;