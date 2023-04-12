module.exports = (Validator) => {
    const { body, oneOf, param } = require("express-validator");

    const blog_update = Validator(oneOf([
        body("title").notEmpty(),
        body("content").notEmpty()
    ]));

    const blog_create = Validator([
        body("title").notEmpty().withMessage("title is required"),
        body("content").notEmpty().withMessage("content is required"),
        body("author").notEmpty().withMessage("author is required")
    ]);

    const blog_delete = Validator([
        param("id").notEmpty().withMessage("id is required").isMongoId().withMessage("invalid id")
    ]);


    return {
        blog_update,
        blog_create,
        blog_delete
    }
}