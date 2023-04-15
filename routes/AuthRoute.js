module.exports = (server, AuthController, AuthValidator) => {
    const router = require("express").Router();

    const setup = () => {
        // Route path
        const routePath = "/auth";

        console.log("[Route setup] /auth ");

        // Route setup
        router.post(
            "/login",
            AuthValidator.auth_login,
            AuthController.auth_login
        );
        router.post(
            "/logout",
            AuthValidator.auth_logout_refresh,
            AuthController.auth_logout
        );

        router.get(
            "/refresh",
            AuthValidator.auth_logout_refresh,
            AuthController.auth_refresh
        );

        server.setRoute(routePath, router);
    };

    return { setup };
};