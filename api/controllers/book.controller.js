
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

    if (book == null && !book?.isDeleted)
        throw new AppError(`Book with id '${bookId}' dosen't exists`, status.NOT_FOUND);

    res.status(status.OK).send(book);
}

const findBookByUserId = async (req, res) => {
    const { userId } = req.params;

    const books = await bookService.findBookByUserId(userId);

    res.status(status.OK).send(books);
}

const createBook = async (req, res) => {
    const { userId } = req.decodeToken;

    const book = await bookService.createBook(userId, req.body);

    res.status(status.OK).send(book);
}

const updateBookById = async (req, res) => {
    const { userId } = req.decodeToken;
    const { bookId } = req.params;
    const book = await bookService.updateBook(bookId, userId, req.body);

    res.status(status.OK).send(book);
}

const deleteBookById = async (req, res) => {
    const { userId } = req.decodeToken;
    const { bookId } = req.params;

    const book = await bookService.deleteBook(bookId, userId);

    res.status(status.OK).send(book);
}

module.exports = {
    findBook,
    findBookById,
    findBookByUserId,
    createBook,
    updateBookById,
    deleteBookById
}