const Blog = require('../models/blogModel');
const User = require('../models/userModel');


const getBlogs = async (req, res) => {
    try {
        const result = await Blog.find().populate("author");
        if (!result) {
           return res.status(200).json({message: "No Blogs present!"})
        };
        res.status(200).json({result});
    } catch (e) {
        res.status(500).json({message: "Connection Failed!"})
    }
}

const getBlogDetails = async (req, res) => {
    try {
        const {blogId} = req.params;
        const result = await Blog.findById(blogId);
        if (!result) {
            return res.status(200).json({message: "Blog is not available!"});
        }
        const author = await User.findById(result.author);
        if (author) {
            result.author = author;
        }
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: "Internet Connection failed!"})
    }
}

const createBlog = async (req, res) => {
    try {
        const userId = req.user._id
        const media = req.file.path || "";
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({message: "Title is not provided"});
        }
        if (!content) {
            return res.status(400).json({message: "Content is not provided"});
        }
        if (!media) {
            return res.status(400).json({message: "Media is not provided"});
        };
        const newBlog = new Blog({
            title,
            content,
            media,
            author: userId
        });
        await newBlog.save();
        res.status(200).json(newBlog);
    } catch (e) {
        res.status(500).json({message: "Connection Failed!"})
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const media = req.file?.path || "";
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({message: "Title is not provided"});
        }
        if (!content) {
            return res.status(400).json({message: "Content is not provided"});
        }
        if (!media) {
            return res.status(400).json({message: "Media is not provided"});
        };

        const newBlog = await Blog.findByIdAndUpdate(id, {
            title,
            media,
            content
        });
        await newBlog.save();
        res.status(200).json(newBlog);
    } catch (error) {
        res.status(500).json({message: "Internet Problem"});
    }
}


module.exports = {
    createBlog,
    getBlogs,
    getBlogDetails,
    updateBlog
}