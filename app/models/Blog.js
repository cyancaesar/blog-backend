const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    created_ts: {
        type: Number,
        default: new Date().valueOf()
    },
    updated_ts: {
        type: Number,
        default: new Date().valueOf()
    }
});

module.exports = mongoose.model("Blog", blogSchema);