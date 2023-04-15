module.exports = (server, UserController, UserValidator, CommonValidator) => {
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
            CommonValidator.token_verification,
            UserController.user_delete
        );

        router.put(
            "/:id?",
            CommonValidator.token_verification,
            UserValidator.user_update,
            UserController.user_update
        );

        server.setRoute(routePath, router);
    };

    return { setup };
};