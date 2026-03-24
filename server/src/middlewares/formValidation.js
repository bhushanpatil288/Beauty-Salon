const { body } = require("express-validator");

const signupValidation = [
    body("phone")
        .isMobilePhone("en-IN")
        .withMessage("Enter valid phone number")
        .notEmpty()
        .withMessage("Phone number is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long")
]

const loginValidation = [
    body("phone")
        .isMobilePhone("en-IN")
        .withMessage("Enter valid phone number")
        .notEmpty()
        .withMessage("Phone number is required"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
]

const adminSignupValidation = [
    body("secretKey")
        .notEmpty()
        .withMessage("Secret Key is required")
        .equals(process.env.ADMIN_SECRET_KEY)
        .withMessage("Invalid Secret Key"),
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),
    body("phone")
        .isMobilePhone("en-IN")
        .withMessage("Enter valid phone number")
        .notEmpty()
        .withMessage("Phone number is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
]

const adminLoginValidation = [
    body("phone")
        .isMobilePhone("en-IN")
        .withMessage("Enter valid phone number")
        .notEmpty()
        .withMessage("Phone number is required"),
    body("secretKey")
        .notEmpty()
        .withMessage("Secret Key is required")
        .equals(process.env.ADMIN_SECRET_KEY)
        .withMessage("Invalid Secret Key"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
]

module.exports = { signupValidation, loginValidation, adminSignupValidation, adminLoginValidation }