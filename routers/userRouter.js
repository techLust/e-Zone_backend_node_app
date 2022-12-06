const express = require('express');
const router = express.Router();
const userController = require('../controllars/userControllar');
const signUpControllar = require('../controllars/signUpUserControllar');

router.route("/")
    .post(signUpControllar.createUsers)
    .get(userController.getUser);

router.route('/:id')
    .patch(userController.updateUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;