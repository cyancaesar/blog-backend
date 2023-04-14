module.exports = (Validator) => {
    const { body, param } = require("express-validator");

    const user_create = Validator([
        body("username")
            .exists().withMessage("Missing username").bail()
            .notEmpty().withMessage("Empty username").bail()
            .isLength({ min: 3, max: 64 }).withMessage("Username length must be between 3 and 64 characters long"),
        body("password")
            .exists().withMessage("Missing password").bail()
            .notEmpty().withMessage("Empty password").bail()
            .isLength({ min: 8, max: 64 }).withMessage("Password length must be between 8 and 64 characters long"),
    ]);

    const user_delete = Validator([
        param("id")
            .exists().withMessage("Missing ID").bail()
            .notEmpty().withMessage("Empty ID").bail()
            .isMongoId().withMessage("Invalid ID").bail()
    ]);

    return {
        user_create,
        user_delete
    };
};