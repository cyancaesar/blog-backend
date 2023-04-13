module.exports = (config) => {

    const http = require("http");
    const express = require("express");
    const app = express();
    const cors = require("cors");
    const cookieParser = require("cookie-parser");

    const setup = () => {
        console.log("Middlewares setup...");
        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({
            origin: "http://localhost:3000",
            credentials: true
        }));
    };

    const setRoute = (path, router) => app.use(path, router);

    // Start listening
    const start = () => {
        console.log(`Server started listening on ::${config.PORT_NUM}`);
        const server = http.createServer(app);
        server.listen(config.PORT_NUM);
    };

    return { start, setup, setRoute };
};