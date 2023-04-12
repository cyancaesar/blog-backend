module.exports = () => {
    require("dotenv").config();

    return {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET,
        PORT_NUM: 4000,
        DB_HOSTNAME: process.env.DB_HOSTNAME,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME
    }
}