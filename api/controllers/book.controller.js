
const status = require('http-status');

const AppError = require('../utils/AppError');
const bookService = require('../services/book.service');


const findBook = async (req, res) => {
    // Extract author, editorial, genre, pubDate and title
    const { title, startPubDate, endPubDate, genre, editorial, author } = req.query;

    const books = await bookService.findBook(
        title,
        startPubDate,
        endPubDate,
        genre,
        editorial,
        author
    );

    res.status(status.OK).send(books);
}

const findBookById = async (req, res) => {
    const { bookId } = req.params;

    const book = await bookService.findBookById(bookId);

    res.status(status.OK).send(book);
}

const createBook = async (req, res) => {
    const { userId } = req.decodeToken;

    const book = await bookService.createBook(userId, req.body);

    res.status(status.OK).send(book);
}

const updateBookById = async (req, res) => {
    const { userId } = req.decodeToken;

    const book = await bookService.updateBook(req.body);

    res.status(status.OK).send(book);
}

const deleteBookById = async (req, res) => {
    const { userId } = req.decodeToken;

    const book = await bookService.updateBook(req.body);

    res.status(status.OK).send(book);
}

module.exports = {
    findBook,
    findBookById,
    createBook,
    updateBookById,
    deleteBookById
}