const adminModel = require('../../models/admin/signUp');
const bcrypt = require('bcryptjs');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!(email && password && role)) res.status(401).json({ message: 'Please enter valid credentials' });

        const adminDetails = await adminModel.findOne({ email: email });

        const isPasswordMatched = bcrypt.compare(password, adminDetails.password);
        if (!isPasswordMatched) res.status(401).json({ message: 'Credentials not matched' });

        if (email === adminDetails.email && isPasswordMatched) {
            res.status(200).json({
                message: 'Admin login successful',
                data: adminDetails,
            });
        };
    } catch(error) { res.status(500).json({ message: 'Something went wrong', error}); };
};