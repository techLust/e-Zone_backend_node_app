const express = require('express');
const router = express.Router();
const signUpControllar = require('../../controllars/user/userSignUpControllar');
const getUserControllar = require('../../controllars/user/getUserControllar');
const updateUserControllar = require('../../controllars/user/updateUserControllar');
const deleteUserControllar = require('../../controllars/user/deleteUserControllar');
const forgotPassController = require('../../controllars/user/forgotPassController')
const validateUserOTP = require('../../controllars/user/verifyUserOTP');
const updateUserPassControllar = require('../../controllars/user/updateUserPassController');

router.route("/")
    .post(signUpControllar.createUsers)
    .get(getUserControllar.getUser);

router.route('/forgot/password').post(forgotPassController.forgotPassword)
router.route('/verify/otp').post(validateUserOTP.checkUserOTP)
router.route('/update/password').patch(updateUserPassControllar.updateUserPass)

router.route('/:id')
    .patch(updateUserControllar.updateUser)
    .put(updateUserControllar.updateUser)
    .delete(deleteUserControllar.deleteUser);


module.exports = router;