
const AppError = require('../utils/AppError');
const status = require('http-status');


const findBook = async (title, pubDate, genere, editorial, author) => {
    console.log(title, pubDate, genere, editorial, author);
    return ["1", "2", "3"];
}

const findBookById = async (bookId) => {
    return bookId;
}

const createBook = async (userId, bookData) => {
    return { userId, bookData };
}

const updateBook = async (bookData) => {
    return bookData;
}

const deleteBook = async (bookData) => {
    return bookData;
}

module.exports = {
    findBook,
    findBookById,
    createBook,
    updateBook,
    deleteBook
}