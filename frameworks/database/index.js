module.exports = (config) => {
    const mongoose = require("mongoose");

    const connect = async () => {
        return mongoose.connect(`mongodb://${config.DB_HOSTNAME}:${config.DB_PORT}/${config.DB_NAME}`);
    };

    return { connect };
};