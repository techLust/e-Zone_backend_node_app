require('dotenv').config();
const UserModel = require('../../models/user/signUpUser');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_ACCESS_KEY;

exports.signIn = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email) return res.status(401).json({
            message: "Email not found",
            isError: true,
        });
        if (!password) return res.status(401).json({
            message: "Password not found",
            isError: true,
        });

        const user = await UserModel.findOne({ email: email });

        if (!user) return res.status(500).json({
            message: "User not found",
            isError: true,
        })

        if (email !== user.email) return res.status(401).json({
            message: "unauthorized credentials",
            isError: true,
        });

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        
        if (!isPasswordMatched) return res.status(401).json({
            message: "unauthorized credentials",
            isError: true,
        });

        password = null;

        //GENERATION TOKEN
        const token = jwt.sign({ id: user._id }, secretKey);

        res.status(200).json({
            message: "User signed in successful",
            token: token,
            user: user,
            isError: false,
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: err.message,
            isError: true,
        })
    };
}