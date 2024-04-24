
const { validationResult } = require("express-validator");
const status = require('http-status');

const userService = require('../services/user.service');

const findUserbyId = async (req, res) => {
    userService.findUserbyId();
    res.status(status.OK).send();
}

const updateUser = async (req, res) => {
    userService.updateUser();
    res.status(status.OK).send();
}

const deleteUser = async (req, res) => {
    userService.deleteUser();
    res.status(status.OK).send();
}

module.exports = {
    findUserbyId,
    updateUser,
    deleteUser
};