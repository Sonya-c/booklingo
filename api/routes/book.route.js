const express = require('express');

const bookController = require('../controllers/book.controller');
const { bookValidation, userValidation } = require('../utils/validations');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Get all books
// Filters 
router.get("/", [bookValidation.findBook, validate],
    catchError(bookController.findBook)
);

// Get a book by id 
router.get("/:bookId",
    [bookValidation.bookId, validate],
    catchError(bookController.findBookById)
);

// Get all books by userId
router.get(
    "/user/:userId",
    [userValidation.userId, validate],
    catchError(bookController.findBookByUserId)
);

// Create a book (auth required)
router.post("/",
    [bookValidation.createBook, validate, catchError(auth)],
    catchError(bookController.createBook)
);

// Update a book (auth required)
router.patch("/:bookId",
    [bookValidation.bookId, bookValidation.updateBook, validate, catchError(auth)],
    catchError(bookController.updateBookById)
);

// Delete a book
router.delete("/:bookId",
    [bookValidation.bookId, validate, catchError(auth)],
    catchError(bookController.deleteBookById)
);


module.exports = router;

