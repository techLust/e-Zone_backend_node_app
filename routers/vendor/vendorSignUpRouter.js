const router = require('express').Router();
const vendorSignUpControllar = require('../../controllars/vendor/vendorSignUpControllar');
const vendorSignInControllar = require('../../controllars/vendor/vendorSignInControllar');
const deleteVendorControllar = require('../../controllars/vendor/deleteVendorControllar');
const getVendorControllar = require('../../controllars/vendor/getVendorControllar');
const updateVendorControllar = require('../../controllars/vendor/updateVendorControllar');

router.route('/').post(vendorSignUpControllar.createVendor)
router.route('/vendor/signin').post(vendorSignInControllar.vendorSignIn);
router.route('/:id').delete(deleteVendorControllar.deleteVendor);
router.route('/get/vendor').get(getVendorControllar.getVendorData);
router.route('/:id').patch(updateVendorControllar.updateVendorData);

module.exports = router;