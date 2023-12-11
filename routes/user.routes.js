const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { isAuthenticated } = require('../utils/is_authenticated');
const { upload } = require('../index');

router.get('/', isAuthenticated, userController.profile);
router.post('/', isAuthenticated, upload.single('avatar'), userController.updateProfile);

module.exports = (app) => {
    app.use('/user-profile', router);
}