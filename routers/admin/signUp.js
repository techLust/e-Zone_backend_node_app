const express = require('express');
const router = express.Router();
const signUpControllar = require('../../controllars/admin/signUp');
const loginControllar = require('../../controllars/admin/login');

router.route('/')
.post(signUpControllar.createAdmin);
router.route('/admin/login').post(loginControllar.adminLogin);

module.exports = router;