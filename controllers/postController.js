const Post = require('../models/post');

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content, author: req.user._id });
        await newPost.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error creating post.');
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.render('index', { posts });
    } catch (err) {
        res.status(500).send('Error fetching posts.');
    }
};

exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id });
        res.render('profile', { posts });
    } catch (err) {
        res.status(500).send('Error fetching user posts.');
    }
};
