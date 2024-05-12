const Order = require('../models/order.model');

const AppError = require('../utils/AppError');
const status = require('http-status');

const userSerive = require('./user.service');
const bookService = require('./book.service');

const createOrder = async (userId, booksId) => {
    const orderCreator = await userSerive.findUserbyId(userId);

    if (orderCreator == null)
        throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);


    const books = [];
    let orderReceiver = null;

    for (let bookId of booksId) {
        const book = await bookService.findBookById(bookId);

        if (book == null)
            throw new AppError(`Book with bookId '${bookId}' not found`, status.NOT_FOUND);

        if (orderReceiver == null) {
            orderReceiver = await userSerive.findUserbyId(book.user);
            console.log(orderReceiver);
            if (orderReceiver == null)
                throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);
        } else if (!book.user.equals(orderReceiver._id)) {
            throw new AppError(`All book owner should be the same.`, status.UNPROCESSABLE_ENTITY);
        }

        books.push(book);
    }

    return await Order.create({ orderCreator, orderReceiver, books });
}

const findOrderById = async (orderId) => {
    return await Order.findById(orderId);
}

const findOrder = async (
    userId,
    orderStatus = null,
    startcreatedDate = null,
    endcreatedDate = null,
    userRol = null,
) => {

    const filter = {};

    if (orderStatus)
        filter.status = orderStatus;

    if (startcreatedDate && endcreatedDate) {
        console.log(startcreatedDate, endcreatedDate);

        filter.createdAt = {
            $gte: startcreatedDate,
            $lte: endcreatedDate
        };
    } else if (startcreatedDate) {
        console.log(startcreatedDate);

        filter.createdAt = { $gte: startcreatedDate };
    } else if (endcreatedDate) {
        console.log(endcreatedDate);

        filter.createdAt = { $lte: endcreatedDate };
    }

    if (userRol)
        filter[userRol === 'creator' ? 'orderCreator' : 'orderReceiver'] = userId;
    else
        filter.$or = [{ orderCreator: userId }, { orderReceiver: userId }];

    return await Order.find(filter);
}
module.exports = {
    createOrder,
    findOrderById,
    findOrder
}