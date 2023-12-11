const { Sequelize } = require('sequelize');
const { models } = require('../index');
const { logger } = require('../config/logger');
const { verifyPassword } = require('../utils/verify_password');
const { hashPassword } = require('../utils/hash_password');

exports.login = (req, res) => {
    res.render('auth/login.hbs', { title: "Login", errorMessage: req.flash('error') });
}

exports.loginUser = (req, res) => {
    res.redirect('/posts');
}

exports.register = (req, res) => {
    res.render('auth/register.hbs', { title: "Register", errorMessage: req.flash('error') });
}

exports.registerUser = (req, res) => {
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            req.flash('error', 'User already exists');
            res.redirect(`/auth/register`);
        } else {
            createUser(req, res);
        }
    }).catch((err) => {
        logger.error(err);
    });

    const createUser = () => {
        models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword(req.body.password)
        }).then((user) => {
            res.redirect(`/auth/login`);
        }).catch((err) => {
            logger.error(err);
            req.flash('error', 'Something went wrong');
            res.redirect(`/auth/register`);
        });
    }
}

exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
}
