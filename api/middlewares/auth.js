const status = require('http-status');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (token == null) return res.sendStatus(status.UNAUTHORIZED);

    jwt.verify(token, SECRET, (err, user) => {
        console.log(err, user);

        if (err) return res.sendStatus(status.FORBIDDEN);

        req.user = user;
        next();
    });
}

module.exports = {
    auth
};