require('dotenv').config();
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const saltRounds = 8;
const secretKey = process.env.SECRET_ACCESS_KEY;

//************// SIGN UP SERVICE //***************/

exports.createUsers = async (req, res) => {
console.log('Sign up call')
    try {
        //CHECKING DATA
        const { firstName, lastName, email, password } = req.body;
        if (!(firstName && lastName && email && password)) {
            return res.send("Enter valid details");
        }
        //ENCRYPTING PASSWORD
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = new UserModel({ firstName, lastName, email, password: hashedPassword });

        //IMAGE UPLOAD
        // const Storage = multer.diskStorage({
        //     destination: 'upload',
        //     filename: (req, file, cb) => {
        //         cb(null, file.originalname);
        //     },
        // });

        // const uploadAvatar = multer({
        //     storage: Storage,
        // }).single('testImage')

    
        //CREATING JWT TOKEN
        const token = jwt.sign(
            {
                email: userData.email,
                password: userData.password,
            },
            secretKey,
            {
                // expiresIn: '1h', //token expire time.
            });

        //SAVING DATA ON DATABASE
        await userData.save();

        res.status(200).json({
            status: 'Success',
            data: {
                User: userData,
            },
            token: token,
        });

        //CATCHING ERROR
    } catch (err) {
        res.status(500).json({
            data: 'Failed',
            Message: err.message,
        });
    };
};