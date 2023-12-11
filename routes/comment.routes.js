const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comment.controller');
const { isAuthenticated } = require('../utils/is_authenticated');

router.post('/', isAuthenticated, commentsController.saveComment);

module.exports = (app) => {
    app.use('/comments', router);
}