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

    const filter = { isDeleted: false };

    if (startPubDate && endPubDate) {
        filter.pubDate = {
            $gte: startPubDate,
            $lte: endPubDate
        };
    } else if (startPubDate) {
        filter.pubDate = { $gte: startPubDate };
    } else if (endPubDate) {
        filter.pubDate = { $lte: endPubDate };
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

    if (book != null && !book?.isDeleted) return book;
};

const findBookByUserId = async (userId) => {
    const user = await userService.findUserbyId(userId);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    return await Book.find({ user: user, isDeleted: false });
}

const createBook = async (userId, bookData) => {
    const user = await userService.findUserbyId(userId);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    const book = await Book.create({
        user, ...bookData
    });

    return book;
}

const updateBook = async (bookId, userId, bookData) => {
    const book = await Book.findById(bookId);
    const user = await userService.findUserbyId(userId);

    if (book == null && !book?.isDeleted)
        throw new AppError(`Book with id '${bookId}' dosen't exists`, status.NOT_FOUND);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    if (!user._id.equals(book.user))
        throw new AppError(`You are not userId = '${userId}'. Get out!`, status.FORBIDDEN);

    return await Book.findByIdAndUpdate(bookId, bookData);
}

const deleteBook = async (bookId, userId) => {
    const book = await Book.findById(bookId);
    const user = await userService.findUserbyId(userId);

    if (book == null && !book?.isDeleted)
        throw new AppError(`Book with id '${bookId}' dosen't exists`, status.NOT_FOUND);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    return await Book.findByIdAndUpdate(bookId, { "isDeleted": true });
}

module.exports = {
    findBook,
    findBookById,
    findBookByUserId,
    createBook,
    updateBook,
    deleteBook
}