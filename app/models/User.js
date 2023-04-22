const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: "default"
    },
    avatar: {
        type: String,
        default: "none"
    }
});

module.exports = mongoose.model("User", userSchema);