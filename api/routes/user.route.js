const express = require('express');

const userController = require('../controllers/user.controller');
const { userValidation } = require('../utils/validations');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

router.get(
    '/:userId',
    [userValidation.userId, validate],
    catchError(userController.findUserbyId)
);

router.get(
    '/email/:userEmail',
    catchError(userController.findUserbyEmail)
);

router.patch(
    '/:userId',
    [userValidation.userId, userValidation.update, validate, catchError(auth)],
    catchError(userController.updateUserById)
);

router.delete(
    '/:userId',
    [userValidation.userId, validate, catchError(auth)],
    catchError(userController.deleteUser)
);

module.exports = router;