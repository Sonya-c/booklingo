
const status = require('http-status');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const jwtService = require('../services/token.service');

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.createUser({ email, password });
    const accessToken = await jwtService.generateToken(user._id);

    return res.status(status.CREATED).send({ user, accessToken });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await authService.login(email, password);
    const accessToken = await jwtService.generateToken(user._id);

    return res.status(status.OK).send({ user, accessToken });
}

module.exports = { register, login, };