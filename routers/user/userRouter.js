const router = require('express').Router();
const signUpControllar = require('../../controllars/user/userSignUpControllar');
const getUserControllar = require('../../controllars/user/getUserControllar');
const updateUserControllar = require('../../controllars/user/updateUserControllar');
const deleteUserControllar = require('../../controllars/user/deleteUserControllar');
const forgotPassController = require('../../controllars/user/forgotPassController')
const validateUserOTP = require('../../controllars/user/verifyUserOTP');
const updateUserPassControllar = require('../../controllars/user/updateUserPassController');
const uploadUserImage = require('../../controllars/user/uploadImgController');
const { uploadImage } = require('../../middleware/uploadImage');
const { getSingleUserData } = require('../../controllars/user/getSingleUser')
const { updateEmail } = require('../../controllars/user/updateEamilController')
const { uploadProfileImage } = require('../../controllars/user/uploadProfileImageController');

router.route("/")
    .post(signUpControllar.createUsers)
    .get(getUserControllar.getUser)
router.route('/:id')
    .patch(updateUserControllar.updateUser)
    .put(updateUserControllar.updateUser)
    .delete(deleteUserControllar.deleteUser)

router.route('/otp').post(updateEmail);
router.route('/image').post(uploadImage,uploadProfileImage);
router.route('/forgot/password').post(forgotPassController.forgotPassword);
router.route('/verify/otp').post(validateUserOTP.checkUserOTP);
router.route('/update/password').patch(updateUserPassControllar.updateUserPass);
router.route('/upload/image').post(uploadImage, uploadUserImage.uploadImage);
router.route('/user').get(getSingleUserData);


module.exports = router;