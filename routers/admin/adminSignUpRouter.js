const express = require('express');
const router = express.Router();
const adminSignUpControllar = require('../../controllars/admin/adminSignUpControllar');
const adminLoginControllar = require('../../controllars/admin/adminLoginControllar');
const deleteAdminControllar = require('../../controllars/admin/deleteAdminControllar');
const updateAdminControllar = require('../../controllars/admin/updateAdminControllar');
const getAdminControllar = require('../../controllars/admin/getAdminControllar');

router.route('/').post(adminSignUpControllar.createAdmin);
router.route('/admin/login').post(adminLoginControllar.adminLogin);
router.route('/:id').delete(deleteAdminControllar.deleteAdminAcc);
router.route('/:id').patch(updateAdminControllar.updateAdminData);
router.route('/get/admin').get(getAdminControllar.getAdminData);


module.exports = router;