const nodemailer = require('nodemailer');

exports.sendMail = (email, subject, messageContent) => {
    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mahatabhossain262@gmail.com',
                pass: 'ynafnsleuhqyiwfi'
            }
        });

        let mailDetails = {
            from: 'mahatabhossain262@gmail.com',
            to: email,
            subject: subject,
            html: messageContent,
        };

        mailTransporter.sendMail(mailDetails, err => { if (err) console.log(err) });

    } catch (err) {
        return err.message;
    }
};
