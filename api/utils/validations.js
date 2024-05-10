
const { param, body, checkExact } = require("express-validator");

const authValidations = {
    "register": [
        body("name")
            .isString().optional({ nullable: true }),
        body("email")
            .exists().withMessage("Email is required")
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .exists().withMessage("Password is required")
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ],
    "login": [
        body("email")
            .exists().withMessage("Email is required")
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .exists().withMessage("Password is required")
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ]
}

const userValidation = {
    "userId": [
        param("userId").isMongoId().withMessage("userID is not a valid ID")
    ],
    "update": [
        body("name")
            .isString().optional({ nullable: true }),
        body("email")
            .optional({ nullable: true })
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .optional({ nullable: true })
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ]
};

const bookValidation = {
    "bookId": [
        param("bookId")
            .isMongoId()
            .withMessage("bookId is not a valid ID")
    ],
    "createBook": [
        body("title")
            .isString()
            .exists().withMessage("Title is required"),
        body("pubDate")
            .isString()
            .exists().withMessage("pubDate is required"),
        body("genere")
            .isString()
            .exists().withMessage("genere is required"),
        body("editorial")
            .isString()
            .exists().withMessage("editorial is required"),
        body("author")
            .isString()
            .exists().withMessage("author is required"),
        checkExact([], { message: 'Too many fields specified' })
    ],
    "updateBook": [
        body("title")
            .isString()
            .optional({ nullable: true }),
        body("pubDate")
            .isString()
            .optional({ nullable: true }),
        body("genere")
            .isString()
            .optional({ nullable: true }),
        body("editorial")
            .isString()
            .optional({ nullable: true }),
        body("author")
            .isString()
            .optional({ nullable: true }),
        checkExact([], { message: 'Too many fields specified' })
    ]
}

module.exports = {
    authValidations,
    userValidation,
    bookValidation
}