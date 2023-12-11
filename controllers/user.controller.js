const { models } = require('../index');
const { logger } = require('../config/logger');
const { hashPassword } = require('../utils/hash_password');

exports.profile = (req, res) => {
    res.render('user/profile.hbs', { title: "Profile", user: req.user.dataValues });
}

exports.updateProfile = (req, res) => {
    const file = req.file;
    const filePath = file ? file.filename : null;

    const data = {
        name: req.body.name,
        email: req.body.email,
        avatar: filePath,
        password: req.body.password ? hashPassword(req.body.password) : null
    }

    // remove null values from data
    Object.keys(data).forEach(key => data[key] == null ? delete data[key] : '');

    models.User.update({
        ...data
    }, {
        where: {
            id: req.user.id
        }
    }).then((user) => {
        res.redirect('/user-profile');
    }).catch((err) => {
        logger.error(err);
    });
}