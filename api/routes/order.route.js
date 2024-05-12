const express = require('express');

const orderController = require('../controllers/order.controller');
const { orderValidation } = require('../utils/validations');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Get all order and filter (should i filter by created/recived??)

// Get order by Id 

// Create a order given a userId and list of BookId
router.post(
    "/",
    [orderValidation.createOrder, validate, catchError(auth)],
    catchError(orderController.createOrder)
)
// Update status (cancel)

// Update status (complete)

// Delete?

module.exports = router;