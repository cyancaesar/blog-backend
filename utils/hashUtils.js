const crypto = require("crypto");

exports.hash = (value) => {
    return crypto.createHash("sha256")
        .update(value)
        .digest("hex");
};