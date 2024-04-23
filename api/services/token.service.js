const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const generateToken = (userID) => {
    return jwt.sign({ userID }, SECRET, { expiresIn: "1h" });
}

const verifyToken = (token) => {
    const payload = jwt.verify(token, SECRET);
}

module.exports = {
    generateToken,
    verifyToken,
};