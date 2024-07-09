const express = require('express')
const router = express.Router();
const {createBlog, getBlogs, getBlogDetails, updateBlog } = require('../controllers/blogController')
const { parser } = require('../database/database')
const { isLoggedIn } = require("../middlewares/authChecker")
router
    .get("/blogs", getBlogs)
    .get("/blog/:blogId/details", isLoggedIn, getBlogDetails)
    .post("/blog/new", isLoggedIn, parser.single('media'), createBlog)
    .post("/blog/:id/update", isLoggedIn, parser.single('media'), updateBlog)
    

    module.exports = router;