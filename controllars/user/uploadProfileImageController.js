const { s3Uploader } = require('../../services/s3Uploader.services');
const UserModel = require('../../models/user/signUpUser');

exports.uploadProfileImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const file = req.file;
        if (!file) return res.status(501).json({ message: 'Please select a file' })
        const { s3, params } = await s3Uploader(file);
        s3.upload(params, async (err, data) => {
            const updatedProfile = await UserModel.findByIdAndUpdate(_id.toString(), { avatar: data.Location })
            res.status(200).json({ 
                message: 'Profile image update successful',
                profileDetails: updatedProfile,
            })
        })
    } catch (err) { return res.status(501).json({ message: 'Profile image upload failed' }) }
};