module.exports = (Validator) => {
    const { body, oneOf, param, query } = require("express-validator");

    const blog_index = Validator([
        query("p")
            .default(0)
            .isNumeric().withMessage("p query parameter must be a number").bail()
            .toInt()
    ]);

    const blog_update = Validator([
        oneOf([
            body("title")
                .notEmpty(),
            body("content")
                .notEmpty()
        ]),
        param("id")
            .notEmpty().withMessage("id is required").bail()
            .isMongoId().withMessage("invalid id")
    ]);

    const blog_create = Validator([
        body("title")
            .notEmpty().withMessage("title is required").bail(),
        body("content")
            .notEmpty().withMessage("content is required")
    ]);

    const blog_delete = Validator([
        param("id")
            .notEmpty().withMessage("id is required").bail()
            .isMongoId().withMessage("invalid id")
    ]);

    const blog_get_by_author = Validator([
        param("author")
            .exists().withMessage("No author provided to search").bail()
            .notEmpty().withMessage("No author provided to search")
    ]);

    const blog_get_by_id = Validator([
        param("id")
            .exists().withMessage("No ID provided to search").bail()
            .notEmpty().withMessage("No ID provided to search")
            .isMongoId().withMessage("Invalid ID")
    ]);

    return {
        blog_index,
        blog_update,
        blog_create,
        blog_delete,
        blog_get_by_author,
        blog_get_by_id
    };
};