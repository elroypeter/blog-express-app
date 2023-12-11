const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const { isAuthenticated } = require('../utils/is_authenticated');
const { upload } = require('../index');

router.get('/', isAuthenticated, postController.postList);
router.get('/create', isAuthenticated, postController.postCreate);
router.post('/create', isAuthenticated, upload.single('postImage'), postController.savePost);
router.get('/:id', isAuthenticated, postController.postDetails);
router.get('/:id/edit', isAuthenticated, postController.postEdit);
router.post('/:id/edit', isAuthenticated, upload.single('postImage'), postController.updatePost);
router.get('/:id/delete', isAuthenticated, postController.deletePost);

module.exports = (app) => {
    app.use('/posts', router);
}