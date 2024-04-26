const express = require('express');

const authController = require('../controllers/auth.controller');
const authValidations = require('../validations/auth.validation');
const { auth } = require('../middlewares/auth');

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

router.post(
    '/logout',
    auth,
    authController.logout
);


module.exports = router;