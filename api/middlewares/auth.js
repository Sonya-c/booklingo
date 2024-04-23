const status = require('http-status');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    // This middleware makes sure that the user is logged in 

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(status.UNAUTHORIZED); // No token, return error 

    jwt.verify(token, SECRET, (err, decodeToken) => {
        if (err) return res.sendStatus(status.FORBIDDEN); // Token expire, return error 

        req.decodeToken = decodeToken;
        next(); // it's logged, continua 
    });
}

module.exports = {
    auth
};