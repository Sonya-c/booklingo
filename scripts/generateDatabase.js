require('dotenv').config();
const mongoose = require('../config/db');

const userService = require('../api/services/user.service');
const authService = require('../api/services/auth.service');
const bookService = require('../api/services/book.service');

process.env.MONGO_DB = "test";

mongoose.connect()
    .then(async () => {
        // TODO
    });
