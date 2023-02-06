const router = require('express').Router();
const vendorSignUpControllar = require('../../controllars/vendor/vendorSignUpControllar');
const vendorSignInControllar = require('../../controllars/vendor/vendorSignInControllar');
const deleteVendorControllar = require('../../controllars/vendor/deleteVendorControllar');
const getVendorControllar = require('../../controllars/vendor/getVendorControllar');
const updateVendorControllar = require('../../controllars/vendor/updateVendorControllar');
const forgotVendorPasswordController = require('../../controllars/vendor/vendorForgotPasswordController');
const addProductController = require('../../controllars/vendor/addProductController');
const { uploadImage } = require('../../middleware/uploadImage');
const uploadImageController = require('../../controllars/user/uploadImgController');

router.route('/').post(vendorSignUpControllar.createVendor)
router.route('/vendor/signin').post(vendorSignInControllar.vendorSignIn);
router.route('/:id').delete(deleteVendorControllar.deleteVendor);
router.route('/get/vendor').get(getVendorControllar.getVendorData);
router.route('/:id').patch(updateVendorControllar.updateVendorData);
router.route('/:id').get(getVendorControllar.getVendorDetailsById);
router.route('/vendor/forgot/password').get(forgotVendorPasswordController.checkVendorEmail);
router.route('/add/product').post(uploadImage,uploadImageController.uploadImage,addProductController.addProduct);

module.exports = router;