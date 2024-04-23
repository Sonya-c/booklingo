const express = require('express');
const { checkSchema } = require("express-validator");

const authController = require('../controllers/auth.controller');
const authValidations = require('../validations/auth.validation');

const router = express.Router();


router.post(
    '/register',
    authValidations.registerValidate,
    authController.register
);


router.post(
    '/login',
    authValidations.loginValidate,
    authController.login
);


router.post('/logout', authController.logout);


module.exports = router;