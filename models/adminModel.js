const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: 'Please enter first name',
    },
    lastName: {
        type: String,
        required: 'Please enter laset name',
    },
    email: {
        type: String,
        required: 'Please enter email',
    },
    password: {
        type: String,
        required: 'Please enter password'
    },
    role: {
        type: String,
        required: 'Please select role',
    }
},);

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = AdminModel;