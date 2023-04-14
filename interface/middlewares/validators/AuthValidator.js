module.exports = (Validator) => {

    const { body } = require("express-validator");

    const auth_login = Validator([
        body("username")
            .exists().withMessage("username required").bail()
            .notEmpty().withMessage("username is empty").bail()
            .isLength({ min: 3 }).withMessage("username must be 3 characters or more").bail()
            .isLength({ max: 64 }).withMessage("username must be less than 64 characters"),
        body("password")
            .exists().withMessage("password required").bail()
            .notEmpty().withMessage("password is empty").bail()
            .isLength({ min: 8 }).withMessage("password must be 8 characters or more").bail()
            .isLength({ max: 64 }).withMessage("password must be less than 64 characters")
    ]);

    return { auth_login };
};