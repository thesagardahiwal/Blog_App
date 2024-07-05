const express = require('express')
const router = express.Router();
const {createBlog, getBlogs } = require('../controllers/blogController')
const { parser } = require('../database/database')
router
    .get("/blogs", getBlogs)
    .post("/blog/new", parser.single('image'), createBlog)


    module.exports = router;