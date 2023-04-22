module.exports = (() => {
    const fs = require("fs");
    const path = require("path");
    const express = require("express");

    const resolveRoutes = (container) => {
        fs.readdirSync(path.join(__dirname, "../routes"))
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                file = path.basename(file, ".js");
                console.log(`Resolving ${file}...`);
                if (container.hasRegistration(file)) {
                    container.resolve(file).setup();
                }
            });

        // Redirect to frontend build
        console.log("[Route setup] *");
        container.cradle.server.setRoute("*", express.static(path.join(__dirname, "./../client/build")));
    };

    return {
        bootstrap: (container) => {
            // Database creation
            container.cradle.db.connect().then(() => {
                console.log("Database connected");
                // Setup express app middleware then resolve all the routes
                container.cradle.server.setup();
                resolveRoutes(container);
                // Start the server
                container.cradle.server.start();
            });
        }
    };
})();