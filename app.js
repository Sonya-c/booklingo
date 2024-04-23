const cors = require('cors');
const express = require("express");

const authRoute = require("./api/routes/auth.route");

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


module.exports = app;