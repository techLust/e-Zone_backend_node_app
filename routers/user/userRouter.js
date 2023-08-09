const router = require('express').Router();
const signUpControllar = require('../../controllars/user/userSignUpControllar');
const getUserControllar = require('../../controllars/user/getUserControllar');
const updateUserControllar = require('../../controllars/user/updateUserControllar');
const deleteUserControllar = require('../../controllars/user/deleteUserControllar');
const { resetPassword } = require('../../helper/resetPassword')
const {checkUserOTP} = require('../../helper/verifyUserOTP');
const updateUserPassControllar = require('../../controllars/user/updateUserPassController');
const uploadUserImage = require('../../controllars/user/uploadImgController');
const { uploadImage } = require('../../middleware/uploadImage');
const { getSingleUserData } = require('../../controllars/user/getSingleUser')
const { sendOTOP } = require('../../helper/otpSender')
const { uploadProfileImage } = require('../../controllars/user/uploadProfileImageController');
const { placeOrder, makePayment, capturePayment } = require('../../controllars/user/orderControllar');


router.route("/")
    .post(signUpControllar.createUsers)
    .get(getUserControllar.getUser)

router.route('/:id')
    .patch(updateUserControllar.updateUser)
    .put(updateUserControllar.updateUser)
    .delete(deleteUserControllar.deleteUser)


router.route('/otp').post(sendOTOP);
router.route('/verify/otp').post(checkUserOTP);
router.route('/forgot/password/:id').post(resetPassword);
router.route('/image').post(uploadImage,uploadProfileImage);
router.route('/update/password').patch(updateUserPassControllar.updateUserPass);
router.route('/upload/image').post(uploadImage, uploadUserImage.uploadImage);
router.route('/user').get(getSingleUserData);
router.route('/add/user/address/:id').post(signUpControllar.addAddress)
router.route('/get/user/address/:id').get(signUpControllar.getAddress)
router.route('/create/order').get(makePayment)
// router.route('/place/order/:userId').post(placeOrder)
router.route('/capture/payment/:paymentId').post(placeOrder)

module.exports = router;