module.exports = (server, AuthController, UserController) => {
    const router = require("express").Router();
    // const authenticate = require("../interface/middlewares/authenticate");
    // const authController = require("../interface/controllers/AuthController")();
    // const userController = require("../interface/controllers/UserController")();

    const setup = () => {
        // Route path
        const routePath = "/auth";

        console.log("[Route setup] /auth ");

        // Route setup
        router.post("/login", AuthController.auth_login);
        router.get("/refresh", AuthController.auth_refresh);
        router.delete("/logout", AuthController.auth_logout); // add authenticate middleware when using the web app
        router.post("/signup", UserController.user_create);
        router.get("/users", UserController.user_get_all);
        router.put("/users", UserController.user_change_password);

        server.setRoute(routePath, router);
    };

    return { setup };
};