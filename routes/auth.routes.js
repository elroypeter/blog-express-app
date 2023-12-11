const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { passport } = require('../index');

router.get('/login', authController.login);
router.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login', failureFlash: true }), authController.loginUser);
router.get('/register', authController.register);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logout);

module.exports = (app) => {
    app.use('/auth', router);
}