const express = require('express');
const status = require('http-status');

const userController = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/:userId', userController.findUserbyId);

router.patch('/', auth, userController.updateUser);

router.delete('/:userId', auth, userController.deleteUser);

module.exports = router;