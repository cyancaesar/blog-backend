module.exports = (server, BlogController, BlogValidator, CommonValidator) => {
    const router = require("express").Router();

    const setup = () => {
        // Route path
        const routePath = "/blog";

        console.log("[Route setup] /blog ");

        // Route setup
        router.get(
            "/",
            BlogValidator.blog_index,
            BlogController.blog_index
        );
        router.get(
            "/:id",
            BlogValidator.blog_get_by_id,
            BlogController.blog_get_by_id
        );
        router.get(
            "/author/:author?",
            BlogValidator.blog_get_by_author,
            BlogController.blog_get_by_author
        );
        router.post(
            "/",
            CommonValidator.token_verification,
            BlogValidator.blog_create,
            BlogController.blog_create
        );
        router.put(
            "/:id?",
            BlogValidator.blog_update,
            BlogController.blog_update
        );
        router.delete(
            "/:id?",
            BlogValidator.blog_delete,
            BlogController.blog_delete
        );

        server.setRoute(routePath, router);
    };

    return { setup };
};
