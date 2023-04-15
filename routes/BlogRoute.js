module.exports = (server, BlogController, BlogValidator) => {
    const router = require("express").Router();

    const setup = () => {
        // Route path
        const routePath = "/blog";

        console.log("[Route setup] /blog ");

        // Route setup
        router.get(
            "/:p?",
            BlogValidator.blog_index,
            BlogController.blog_index
        );
        router.post(
            "/",
            BlogValidator.blog_create,
            BlogController.blog_create
        );
        router.get("/:author", BlogController.blog_get_by_author);
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
