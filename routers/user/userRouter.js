const router = require('express').Router();
const signUpControllar = require('../../controllars/user/userSignUpControllar');
const getUserControllar = require('../../controllars/user/getUserControllar');
const updateUserControllar = require('../../controllars/user/updateUserControllar');
const deleteUserControllar = require('../../controllars/user/deleteUserControllar');
const { resetPassword } = require('../../helper/resetPassword')
const { checkUserOTP } = require('../../helper/verifyUserOTP');
const updateUserPassControllar = require('../../controllars/user/updateUserPassController');
const { uploadImageToCloudinary } = require('../../controllars/user/uploadImgToCloudinaryController');
const { uploadImage } = require('../../middleware/uploadImage');
const { getSingleUserData } = require('../../controllars/user/getSingleUser')
const { sendOTOP } = require('../../helper/otpSender')
const { uploadProfileImage } = require('../../controllars/user/uploadProfileImageController');
const { placeOrder,
    makePayment,
    capturePayment,
    getAllOrders } = require('../../controllars/user/orderControllar');

const { chatWithUs } = require('../../controllars/user/chatControllars');
const { createInvoice } = require('../../controllars/user/invoiceControllar');
const { getAllPayments } = require('../../controllars/user/paymentControllar');


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
router.route('/profile/image').post(uploadImage, uploadProfileImage);
router.route('/update/password').patch(updateUserPassControllar.updateUserPass);
router.route('/upload/image').post(uploadImage, uploadImageToCloudinary);
router.route('/user').get(getSingleUserData);
router.route('/add/user/address/:id').post(signUpControllar.addAddress)
router.route('/get/user/address/:id').get(signUpControllar.getAddress)
// router.route('/create/order').get(makePayment)
router.route('/place/order/:userId').post(placeOrder)
// router.route('/capture/payment/:paymentId').post(placeOrder)
router.route('/chat/with/us').post(chatWithUs)
router.route('/get/all/orders/:userId').get(getAllOrders)
router.post('/create/invoice/:orderId', createInvoice)
router.get('/get/payments/:userId', getAllPayments)

module.exports = router;