const express = require('express');

const userController = require('../controllers/user.controller');
const { userValidation } = require('../utils/validations');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Search user by ID
router.get(
    '/:userId',
    [userValidation.userId, validate],
    catchError(userController.findUserbyId)
);

// Search user by Email
router.get(
    '/email/:userEmail',
    catchError(userController.findUserbyEmail)
);

// Update user (auth requried)
router.patch(
    '/',
    [userValidation.update, validate, catchError(auth)],
    catchError(userController.updateUserById)
);

// Delete user (auth requried)
router.delete(
    '/',
    [validate, catchError(auth)],
    catchError(userController.deleteUser)
);

module.exports = router;