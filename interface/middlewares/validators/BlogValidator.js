module.exports = (Validator) => {
    const { body, oneOf, param, query } = require("express-validator");

    const blog_index = Validator([
        query("p").default(0).isNumeric().withMessage("p query parameter must be a number")
    ]);

    const blog_update = Validator([
        oneOf([
            body("title").notEmpty(),
            body("content").notEmpty()
        ]),
        param("id").notEmpty().withMessage("id is required").isMongoId().withMessage("invalid id")
    ]);

    const blog_create = Validator([
        body("title").notEmpty().withMessage("title is required"),
        body("content").notEmpty().withMessage("content is required"),
        body("author").notEmpty().withMessage("author is required")
    ]);

    const blog_delete = Validator([
        param("id").notEmpty().withMessage("id is required").isMongoId().withMessage("invalid id")
    ]);

    return {
        blog_index,
        blog_update,
        blog_create,
        blog_delete
    }
}