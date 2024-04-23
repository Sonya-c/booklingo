
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
    const user = await userService.createUser({ email, password });
    const accessToken = await jwtService.generateToken(email);

    return res.status(status.CREATED).send({ user, accessToken });
}

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(status.UNPROCESSABLE_ENTITY).json(errors)
    }

    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const accessToken = await jwtService.generateToken(email);

    return res.status(status.OK).send({ user, accessToken });
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