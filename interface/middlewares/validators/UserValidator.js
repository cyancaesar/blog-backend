module.exports = (Validator) => {
    const { body, param } = require("express-validator");

    const fillable = ["password"];

    const user_create = Validator([
        body("username")
            .exists().withMessage("Missing username").bail()
            .notEmpty().withMessage("Empty username").bail()
            .isLength({ min: 3, max: 64 }).withMessage("Username length must be between 3 and 64 characters long"),
        body("password")
            .exists().withMessage("Missing password").bail()
            .notEmpty().withMessage("Empty password").bail()
            .isLength({ min: 8, max: 64 }).withMessage("Password length must be between 8 and 64 characters long")
    ]);

    // Probably need ID for high-privileged user to delete another account eShrug
    // so I keep it for later use
    const user_delete = Validator([
        param("id")
            .exists().withMessage("Missing ID").bail()
            .notEmpty().withMessage("Empty ID").bail()
            .isMongoId().withMessage("Invalid ID").bail()
    ]);

    const user_update = Validator([
        body("password")
            .exists().withMessage("No password provided").bail()
            .notEmpty().withMessage("No password provided").bail()
            .isLength({ min: 8, max: 64 }).withMessage("Password length must be between 8 and 64 characters long"),
        body().custom((value, { req }) => {
            // Strips non fillable properties that came with the request
            Object.keys(value).forEach(prop => {
                if (!fillable.includes(prop))
                    delete req.body[prop];
            });
            return true;
        })
    ]);

    return {
        user_create,
        user_delete,
        user_update
    };
};