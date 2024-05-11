const express = require('express');

const userController = require('../controllers/user.controller');
const { userValidation } = require('../utils/validations');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Get all users 
router.get("/", catchError(userController.getAllUsers));

// Get one user by id
router.get(
    '/:userId',
    [userValidation.userId, validate],
    catchError(userController.findUserbyId)
);

// Update one user by id (auth required)
router.patch(
    '/',
    [userValidation.update, validate, catchError(auth)],
    catchError(userController.updateUserById)
);

// Delete one user by id (auth required)
router.delete(
    '/',
    [validate, catchError(auth)],
    catchError(userController.deleteUser)
);

module.exports = router;