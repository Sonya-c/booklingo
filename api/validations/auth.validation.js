
const { body } = require("express-validator");

const loginValidate = [
    body("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Provide valid email"),
    body("password")
        .exists().withMessage("Password is required")
        .isString().withMessage("Password should be string")
        .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
];


const registerValidate = [
    body("email")
        .exists().withMessage("Email is required")
        .isEmail().withMessage("Provide valid email"),
    body("password")
        .exists().withMessage("Password is required")
        .isString().withMessage("Password should be string")
        .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
]

module.exports = {
    loginValidate,
    registerValidate
}