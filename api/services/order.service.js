const Order = require('../models/order.model');

const AppError = require('../utils/AppError');
const status = require('http-status');


const findOrderById = async (orderId) => {
    return { orderId };
}



const createOrder = async (userId, books) => {
    return { userId, books };
}

const updateOrderStatus = async (userId, orderId, status) => {
    return { userId, orderId, status };
}

const deleteOrder = async (userId, orderId) => {

}