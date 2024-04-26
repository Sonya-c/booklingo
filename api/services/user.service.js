const User = require('../models/user.model');


const createUser = async (userData) => {
    const users = await findUserbyEmail(userData.email);

    if (users != null) throw new Error(`User with email '${userData.email}' already exists`);

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
