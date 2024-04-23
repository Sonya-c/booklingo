const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const generateToken = (userID) => {
    return jwt.sign({ userID }, SECRET, { expiresIn: "1h" });
}

module.exports = {
    generateToken,
};