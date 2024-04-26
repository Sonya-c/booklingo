
const { validationResult } = require("express-validator");

const status = require('http-status');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const jwtService = require('../services/token.service');

const register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(status.UNPROCESSABLE_ENTITY).json(errors)
    }

    const { email, password } = req.body;

    try {
        const user = await userService.createUser({ email, password });
        const accessToken = await jwtService.generateToken(email);

        return res.status(status.CREATED).send({ user, accessToken });
    } catch (error) {
        // Multiple users should be conclit 
        return res.status(status.INTERNAL_SERVER_ERROR).send({ "Error": error.message })
    }
}

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(status.UNPROCESSABLE_ENTITY).json(errors)
    }

    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        const accessToken = await jwtService.generateToken(email);

        return res.status(status.OK).send({ user, accessToken });
    } catch (error) {
        // 404 if user don't exist
        // unauthorize if password dosent match 

        return res.status(status.INTERNAL_SERVER_ERROR).send({ "Error": error.message })
    }
}

const logout = async (req, res) => {
    await authService.logout();
    res.status(status.NO_CONTENT).send();
}

module.exports = {
    register,
    login,
    logout
};