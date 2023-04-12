const { createContainer, asFunction, asValue } = require("awilix");
const container = createContainer({
    injectionMode: "CLASSIC"
});

const config = require("./config");
const server = require("./frameworks/server");
const db = require("./frameworks/database");

container.register({
    server: asFunction(server).singleton(),
    config: asFunction(config).singleton(),
    db: asFunction(db).singleton(),
});

container.loadModules([
    [
        "app/models/*.js",
        {
            register: asValue
        }
    ],
    "app/service/*.js",
    "app/repository/*.js",
    "interface/controllers/*.js",
    "routes/*.js",
    "interface/middlewares/validators/*.js"
]);

module.exports = container;