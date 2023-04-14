module.exports = (server, UserController, UserValidator) => {
    const router = require("express").Router();

    const setup = () => {
        // Route path
        const routePath = "/user";

        console.log("[Route setup] /user");

        // Route setup
        router.post(
            "/",
            UserValidator.user_create,
            UserController.user_create
        );

        router.delete(
            "/:id?",
            UserValidator.user_delete,
            UserController.user_delete
        );

        router.put(
            "/:id?",
            UserController.user_update
        );

        server.setRoute(routePath, router);
    };

    return { setup };
};