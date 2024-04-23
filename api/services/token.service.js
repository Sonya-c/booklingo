const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;
const EXPIRE_TIME = process.env.JWT_ACCESS_EXPIRE;

const generateToken = (userID, expireTime = EXPIRE_TIME) => {
    return jwt.sign(
        { userID },
        SECRET,
        { expiresIn: expireTime * 60 }
    );
}

module.exports = {
    generateToken,
};