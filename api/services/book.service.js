const Book = require('../models/book.model');

const userService = require('../services/user.service');

const AppError = require('../utils/AppError');
const status = require('http-status');


const findBook = async (
    title,
    startPubDate,
    endPubDate,
    genre,
    editorial,
    author
) => {

    console.log(startPubDate, endPubDate);
    console.log(new Date(startPubDate).toISOString(), new Date(endPubDate).toISOString());


    const filter = {};

    if (startPubDate && endPubDate) {
        filter.publishDate = {
            $gte: new Date(startPubDate).toISOString(),
            $lte: new Date(endPubDate).toISOString()
        };
    } else if (startPubDate) {
        filter.publishDate = { $gte: new Date(startPubDate).toISOString() };
    } else if (endPubDate) {
        filter.publishDate = { $lte: new Date(endPubDate).toISOString() };
    }

    if (title) filter.title = { $regex: new RegExp(title, "i") };

    if (genre) filter.genre = { $regex: new RegExp(genre, "i") };;

    if (editorial) filter.editorial = { $regex: new RegExp(editorial, "i") };

    if (author) filter.author = { $regex: new RegExp(author, "i") };

    const books = await Book.find(filter);

    return books;
};

const findBookById = async (bookId) => {
    const book = await Book.findById(bookId);

    if (book != null && !book.isDeleted) return book;
}

const createBook = async (userId, bookData) => {
    const user = await userService.findUserbyId(userId);

    if (user == null)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    const book = await Book.create({
        user, ...bookData
    });

    return book;
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