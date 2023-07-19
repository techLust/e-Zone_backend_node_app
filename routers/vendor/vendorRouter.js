const router = require('express').Router();
const vendorSignUpControllar = require('../../controllars/vendor/vendorSignUpControllar');
const vendorSignInControllar = require('../../controllars/vendor/vendorSignInControllar');
const deleteVendorControllar = require('../../controllars/vendor/deleteVendorControllar');
const getVendorControllar = require('../../controllars/vendor/getVendorControllar');
const updateVendorControllar = require('../../controllars/vendor/updateVendorControllar');
const forgotVendorPasswordController = require('../../controllars/vendor/vendorForgotPasswordController');
const addProductController = require('../../controllars/vendor/addProductController');
const { uploadImage } = require('../../middleware/uploadImage');
const { getProducts, getProductById } = require('../../controllars/vendor/getProductController');
const { addProductToCart, getCartProduct } = require('../../controllars/user/addCartControllar');

router.route('/').post(vendorSignUpControllar.createVendor);
router.route('/vendor/signin').post(vendorSignInControllar.vendorSignIn);
router.route('/:id').delete(deleteVendorControllar.deleteVendor);
router.route('/get/vendor').get(getVendorControllar.getVendorData);
router.route('/:id').patch(updateVendorControllar.updateVendorData);
router.route('/:id').get(getVendorControllar.getVendorDetailsById);
router.route('/vendor/forgot/password').get(forgotVendorPasswordController.checkVendorEmail);
router.route('/add/product').post(uploadImage,addProductController.addProduct);
router.route('/get/product').get(getProducts)
router.route('/get/product/:id').get(getProductById)
router.route('/add/cart/').post(addProductToCart)
router.route('/get/cart/:id').get(getCartProduct)

module.exports = router;