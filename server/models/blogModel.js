const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    media: {type: String},
    author: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    love: [
        {type: mongoose.Schema.ObjectId, ref: "User"}
    ]
}, {
    timestamps: true
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog;