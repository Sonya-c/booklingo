
const { validationResult } = require("express-validator");
const status = require('http-status');

const userService = require('../services/user.service');


const findUserbyId = async (req, res) => {
    const { userId } = req.params; 

    const user = await userService.findUserbyId(userId);
    res.status(status.OK).send(user);
}

const updateUserById = async (req, res) => {
    const { userId } = req.params; 
    
    const user = await userService.updateUserById(userId, req.body);
    res.status(status.OK).send(user);
}

const deleteUser = async (req, res) => {
    userService.deleteUser();
    res.status(status.OK).send();
}

module.exports = {
    findUserbyId,
    updateUserById,
    deleteUser
};