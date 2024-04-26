const bcrypt = require('bcrypt');
const userService = require('./user.service');

const login = async (email, password) => {
    const user = await userService.findUserbyEmail(email);

    if (!user) {
        // Should be 404
        throw new Error(`User with email '${email}' dosen't exists`);
    }

    if (bcrypt.compareSync(password, user.password)) {
        return user;
    } else {
        // unauthorize
        throw new Error(`Wrong password`);
    }
}

const logout = async () => { }


module.exports = {
    login,
    logout
};