
const status = require('http-status');

const AppError = require('../utils/AppError');
const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
    const users = await userService.findAllUser();

    res.status(status.OK).send(users);
}

const findUserbyEmail = async (req, res) => {
    const { userEmail } = req.params;
    const user = await userService.findUserbyEmail(userEmail);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with email '${userEmail}' dosen't exists`, status.NOT_FOUND);

    res.status(status.OK).send(user);
}


const findUserbyId = async (req, res) => {
    const { userId } = req.params;
    const user = await userService.findUserbyId(userId);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);

    res.status(status.OK).send(user);

}

const updateUserById = async (req, res) => {
    const { userId } = req.decodeToken;

    const user = await userService.updateUserById(userId, req.body);
    res.status(status.OK).send(user);
}

const deleteUser = async (req, res) => {
    const { userId } = req.decodeToken;
    const user = await userService.deleteUser(userId);
    res.status(status.OK).send(user);
}

module.exports = {
    getAllUsers,
    findUserbyId,
    updateUserById,
    deleteUser,
    findUserbyEmail
};