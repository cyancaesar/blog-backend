const jwt = require("jsonwebtoken");

exports.genAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

exports.genRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};