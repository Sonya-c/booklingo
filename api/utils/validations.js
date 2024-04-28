
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

module.exports = {
    authValidations,
    userValidation
}