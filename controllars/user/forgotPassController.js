const nodemailer = require('nodemailer');
// const router = require('express').Router();
const ForgotPassModel = require('../../models/user/userForgotPassModel');

exports.forgotPassword = (req, res) => {

    const { email } = req.body;
    const OTP = Math.floor(1000 + Math.random() * 9000);

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahatabhossain262@gmail.com',
            pass: 'ynafnsleuhqyiwfi'
        }
    });

    let mailDetails = {
        from: 'mahatabhossain262@gmail.com',
        to: `${email}`,
        subject: 'Reset password',
        // text: `Hey there, whats going on. I will join you shortly <p>OTP</p> `,
        html: `<p>Your one time password is: ${OTP} </p>
                Click below link to reset your password
                <p>http://localhost:4200/forgot/password</p>`

    };

    mailTransporter.sendMail(mailDetails, (err, data) => {

        if (data.rejected.length == 0 && data.accepted.length > 0) {
            const forgotPassDetails = new ForgotPassModel({ email: data.envelope.to[0], OTP: OTP });

            forgotPassDetails.save();

            return res.status(200).json({
                status: 'Check your email for OTP',
                data: data,
            });
        }
        else { return res.status(200).json({ status: 'User does not exist', err}) }
    });
};
