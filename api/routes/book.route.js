const express = require('express');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Get all books
// Filters 
route.get("/");

// Get a book by id 
route.get("/:bookID");

// Create an book (auth required)
route.post("/");

// Update an book (auth required)
route.patch("/");


module.exports = router;

