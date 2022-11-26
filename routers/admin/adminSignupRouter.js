const express = require('express');
const router = express.Router();
const adminControllar = require('../../controllars/admin/adminControllar');

router.route('/').post(adminControllar.createAdmin);

module.exports = router;