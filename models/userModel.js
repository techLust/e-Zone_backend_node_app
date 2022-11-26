const mongoose = require('mongoose');

//********// CREATE USERS SCHEMA //************* */

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Please enter first name',
        trim: true,
    },
    lastName: {
        type: String,
        required: "Please enter last name",
        trim: true,
    },
    email: {
        type: String, 
        unique: true,
        trim: true,
        lowercase: true,
        // validate: [{ validator: value => isEmail(value), msg: 'Invalid email.' }],
        required: 'Please enter valid email',
    },
    password: {
        type: String,
        required: 'Please enter password',
    },
    // avatar: {
    //     data: Buffer,
    //     contentType: String,
    // }

}, {
    timestamps: true,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

//Default export(can be import by any name)
// module.exports = mongoose.model('User', UserSchema);
