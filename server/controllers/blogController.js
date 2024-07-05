const Blog = require('../models/blogModel');


const getBlogs = async (req, res) => {
    try {
        const result = await Blog.find();
        if (!result) {
            res.status(200).json({message: "No Blogs present!"})
        };
        res.status(200).json({result});
    } catch (e) {
        res.status(500).json({message: "Connection Failed!"})
    }
}

const createBlog = async (req, res) => {
    try {
        const userId = req.user._id
        const media = req.file.path || "";
        const { title, content } = req.body;
        if (!title) {
            res.status(400).json({message: "Title is not provided"});
        }
        if (!content) {
            res.status(400).json({message: "Content is not provided"});
        }
        if (!media) {
            res.status(400).json({message: "Media is not provided"});
        };
        const newBlog = await Blog.create({
            title,
            content,
            media,
            userId
        });
        newBlog.save();
        res.status(200).json(newBlog);
    } catch (e) {
        res.status(500).json({message: "Connection Failed!"})
    }
};

module.exports = {
    createBlog,
    getBlogs
}