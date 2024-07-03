const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/', postController.getAllPosts);
router.post('/new-post', ensureAuthenticated, postController.createPost);
router.get('/profile', ensureAuthenticated, postController.getUserPosts);

module.exports = router;
