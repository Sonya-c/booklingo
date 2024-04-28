const express = require('express');

const authController = require('../controllers/auth.controller');
const authValidations = require('../validations/auth.validation');

const validate = require('../middlewares/validations');

const router = express.Router();


router.post(
    '/register',
    [authValidations.register, validate],
    authController.register
);


router.post(
    '/login',
    [authValidations.login, validate],
    authController.login
);


module.exports = router;