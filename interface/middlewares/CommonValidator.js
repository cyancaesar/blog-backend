module.exports = (Validator) => {

    const { header } = require("express-validator");
    const { verifyRefreshToken } = require("./../../utils/jwtUtils");

    const token_verification = Validator([
        header("Authorization")
            .exists().withMessage("Missing token").bail()
            .notEmpty().withMessage("Missing token").bail()
            .custom((value, { req }) => {
                if (value.includes("Bearer") && value.split(" ").length === 2) {
                    req.headers.Authorization = value.split(" ")[1];
                    return true;
                }
                return false;
            }).withMessage("Wrong token format not [Bearer :token]").bail()
            .customSanitizer(value => value.split(" ")[1])
            .isJWT().withMessage("Malformed JWT").bail()
            .custom(verifyRefreshToken)
    ]);

    return { token_verification };
};