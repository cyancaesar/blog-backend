module.exports = (Validator) => {

    const { body, cookie } = require("express-validator");
    const { verifyRefreshToken } = require("../../../utils/jwtUtils");

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
            .isLength({ max: 64 }).withMessage("password must be less than 64 characters"),
        body("remember")
            .exists().withMessage("Missing remember me field").bail()
            .notEmpty().withMessage("Missing remember me field").bail()
            .isBoolean().withMessage("remember must be either true or false").bail()
            .toBoolean()
    ]);

    const auth_logout_refresh = Validator([
        cookie("refreshToken")
            .exists().withMessage("Missing refresh token").bail()
            .notEmpty().withMessage("Missing refresh token").bail()
            .custom(verifyRefreshToken)
    ]);

    return {
        auth_login,
        auth_logout_refresh
    };
};