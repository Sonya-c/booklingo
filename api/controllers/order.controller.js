const status = require('http-status');

const AppError = require('../utils/AppError');
const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    const { userId } = req.decodeToken;
    const { books: booksId } = req.body;

    const order = await orderService.createOrder(userId, booksId);

    res.status(status.OK).send(order);
}

module.exports = {
    createOrder
}