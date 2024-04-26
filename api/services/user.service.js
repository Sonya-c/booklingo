const User = require('../models/user.model');

const AppError = require('../utils/AppError');
const status = require('http-status');

const createUser = async (userData) => {
    const users = await findUserbyEmail(userData.email);

    if (users != null) throw new AppError(`User with email '${userData.email}' already exists`, status.CONFLICT);

    return await User.create(userData);
}


const findUserbyEmail = async (email) => {
    return await User.findOne({ email });
}

const findUserbyId = async (id) => { }

const updateUser = async (userData) => {
    return userData;
}

const deleteUser = async (id) => { }

module.exports = {
    createUser,
    findUserbyId,
    updateUser,
    deleteUser,
    findUserbyEmail
};
