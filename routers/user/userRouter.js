const router = require('express').Router();
const signUpControllar = require('../../controllars/user/userSignUpControllar');
const getUserControllar = require('../../controllars/user/getUserControllar');
const updateUserControllar = require('../../controllars/user/updateUserControllar');
const deleteUserControllar = require('../../controllars/user/deleteUserControllar');
const forgotPassController = require('../../controllars/user/forgotPassController')
const validateUserOTP = require('../../controllars/user/verifyUserOTP');
const updateUserPassControllar = require('../../controllars/user/updateUserPassController');
const uploadUserImage = require('../../controllars/user/uploadImgController');
const { uploadImage } = require('../../middleware/uploadImage')
const { uploadImageToS3 } = require('../../controllars/user/uploadImgToS3')

router.route("/")
    .post(signUpControllar.createUsers)
    .get(getUserControllar.getUser);

router.route('/forgot/password').post(forgotPassController.forgotPassword);
router.route('/verify/otp').post(validateUserOTP.checkUserOTP);
router.route('/update/password').patch(updateUserPassControllar.updateUserPass);
router.route('/upload/image').post(uploadImage, uploadUserImage.uploadImage );
router.route('/upload/image/s3').post(uploadImage,uploadImageToS3);

router.route('/:id')
    .patch(updateUserControllar.updateUser)
    .put(updateUserControllar.updateUser)
    .delete(deleteUserControllar.deleteUser);


module.exports = router;