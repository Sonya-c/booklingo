const express = require('express');

const userController = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/:userId', userController.findUserbyId);

router.patch('/:userId', auth, userController.updateUserById);

router.delete('/:userId', auth, userController.deleteUser);

module.exports = router;