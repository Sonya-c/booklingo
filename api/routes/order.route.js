const express = require('express');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Create a order given a userId and list of BookId

// Get all order and filter (should i filter by created/recived??)

// Get order by Id 

// Update status (cancel)

// Update status (complete)

// Delete?

module.exports = router;