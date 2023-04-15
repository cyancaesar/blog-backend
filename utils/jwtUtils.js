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

// Verify the jwt token
// before reaching the protected endpoints
exports.verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                if (err.message.includes("JSON")) {
                    return reject("Incompatable token");
                }
                return reject(err.message);
            }
            return resolve("Token is valid");
        });
    });
};

exports.verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
            if (err) {
                if (err.message.includes("JSON")) {
                    return reject("Incompatable token");
                }
                return reject(err.message);
            }
            return resolve("Token is valid");
        });
    });
};

exports.decodeToken = (token) => {
    return jwt.decode(token);
};