const userModel = require('../models/user/signUpUser');

//**********// DUPLICATE EMAIL CHECKER MIDDLEWARE //*************** */ */
exports.chaeckDuplicateUsernameOrEmail = (req, res, next) => {
    //CHECKING EMAIL INTO PROVIDED BY USER
    userModel.findOne({ email: req.body.email})
    .exec((err, user) => {
        if(err) return res.status(500).json({ message: err.message});
        if(user) return res.status(400).json({ message: "User already exist"});
        next();
    });
};