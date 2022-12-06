const AdminModel = require('../../models/admin/signUp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_ACCESS_KEY;
const saltRounds = 8;

exports.createAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        if (!(firstName && lastName && email && password && role)) { res.status(500).json({ message: 'Enter valid details' }); };

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminData = new AdminModel({ firstName, lastName, email, password: hashedPassword, role });

        const token = jwt.sign({
            email: adminData.email,
            password: adminData.password,
        }, secretKey);

        await adminData.save();

        res.status(200).json({
            status: 'Admin created successfully',
            data: adminData,
            token: token,
        });
    }
    catch (error) { res.status(500).json({ message: error.message, }); };
};