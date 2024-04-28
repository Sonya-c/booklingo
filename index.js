require('dotenv').config();

const status = require('http-status');
const cors = require('cors');
const express = require("express");

const authRoute = require("./api/routes/auth.route");
const userRoute = require("./api/routes/user.route");
const connect = require('./config/connect');

const PORT = process.env.PORT || 5000;

// Open mongo connection 
connect();

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors 
app.use(cors());
app.options('*', cors());

// routes 
app.use('/auth', authRoute);
app.use('/user', userRoute);

// Error handeling
app.use((error, req, res, next) => {
    return res
        .status(error.status || status.INTERNAL_SERVER_ERROR)
        .send({ "Error": error.message, "Stack": error.stack })
});

app.listen(PORT, () => {
    const hyperLink = (text, link) => `\x1b]8;;${link}\x1b\\${text}\x1b[0m\x1b]8;;\x1b\\`;
    const serverURL = `http://localhost:${PORT}`;
    const theLittleBar = "\x1b[90m┃\x1b[0m";
    console.log(`${theLittleBar} Server running on \t \x1b[36m${hyperLink(serverURL, serverURL)}`);
});