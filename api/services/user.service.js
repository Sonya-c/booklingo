const User = require('../models/user.model');

const AppError = require('../utils/AppError');
const status = require('http-status');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const createUser = async (userData) => {
    const users = await findUserbyEmail(userData.email);
    userData.password = bcrypt.hashSync(userData.password, SALT_ROUNDS);

    if (users != null) throw new AppError(`User with email '${userData.email}' already exists`, status.CONFLICT);

    return await User.create(userData);
}


const findUserbyEmail = async (email) => {
    return await User.findOne({ email });
}

const findUserbyId = async (userId) => {
    return await User.findById(userId);
}

const updateUserById = async (userId, userData) => {
    if (await findUserbyEmail(userData.email) != null) throw new AppError(`User with email '${userData.email}' already exists`, status.CONFLICT);

    if (userData['password'])
        userData.password = bcrypt.hashSync(userData.password, SALT_ROUNDS);

    // if (await findUserbyId(userId) == null) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

    return await User.findByIdAndUpdate( userId, userData);
}

const deleteUser = async (id) => { }

module.exports = {
    createUser,
    findUserbyId,
    updateUserById,
    deleteUser,
    findUserbyEmail
};
