const express = require('express');
const router = express.Router();
const signUpControllar = require('../../controllars/user/userSignUpControllar');
const getUserControllar = require('../../controllars/user/getUserControllar');
const updateUserControllar = require('../../controllars/user/updateUserControllar');
const deleteUserControllar = require('../../controllars/user/deleteUserControllar');

router.route("/")
    .post(signUpControllar.createUsers)
    .get(getUserControllar.getUser);

router.route('/:id')
    .patch(updateUserControllar.updateUser)
    .put(updateUserControllar.updateUser)
    .delete(deleteUserControllar.deleteUser);


module.exports = router;