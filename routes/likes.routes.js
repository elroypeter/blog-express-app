const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes.controller');
const { isAuthenticated } = require('../utils/is_authenticated');

router.get('/:id', isAuthenticated, likesController.saveLike);

module.exports = (app) => {
    app.use('/likes', router);
}