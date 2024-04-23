
const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const jwtService = require('../services/token.service');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.createUser({ email, password });
    const token = await jwtService.generateToken(email);

    return res.status(201).send({ user, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const token = await jwtService.generateToken(email);

    return res.status(200).send({ user, token });
}

const logout = async (req, res) => {
    await authService.logout();
    res.status(200).json({ "logged": false });
}

module.exports = {
    register,
    login,
    logout
};