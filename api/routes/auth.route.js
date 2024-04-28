const express = require('express');

const authController = require('../controllers/auth.controller');
const { authValidations } = require('../utils/validations');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

router.post(
    '/register',
    [authValidations.register, validate],
    catchError(authController.register)
);


router.post(
    '/login',
    [authValidations.login, validate],
    catchError(authController.login)
);


module.exports = router;