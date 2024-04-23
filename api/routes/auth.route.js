const express = require('express');
const status = require('http-status');

const authController = require('../controllers/auth.controller');
const authValidations = require('../validations/auth.validation');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Just to check if it's authenticated
router.get(
    '/status',
    auth,
    (req, res) => res.status(status.OK).json(req.decodeToken)
);

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