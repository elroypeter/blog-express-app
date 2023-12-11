const { models } = require('../index');
const { logger } = require('../config/logger');

exports.postCreate = (req, res) => {
    res.render('post/create.hbs', { user: req.user.dataValues, title: "Create Post" });
}

exports.postList = (req, res) => {
    models.Post.findAll({
        include: [
            {
                model: models.User,
            },
            {
                model: models.Comment
            },
            {
                model: models.PostLike
            }
        ]
    }).then((posts) => {
        res.render('post/list.hbs', { user: req.user.dataValues, title: "Posts", posts });
    }).catch((err) => {
        logger.error(err);
    });
}

exports.savePost = (req, res) => {
    const postImage = req.file;
    models.Post.create({
        title: req.body.title,
        content: req.body.description,
        cover_image: postImage ? postImage.filename : null,
        UserId: req.user.dataValues.id,
    }).then((post) => {
        res.redirect('/posts');
    }).catch((err) => {
        logger.error(err);
    });
}

exports.postDetails = (req, res) => {
    models.Post.findByPk(req.params.id, {
        include: [
            {
                model: models.User,
            },
            {
                model: models.Comment,
                // add nested User Object
                include: [
                    {
                        model: models.User
                    }
                ]
            },
            {
                model: models.PostLike
            }
        ]
    }).then((post) => {
        res.render('post/details.hbs', { user: req.user.dataValues, title: "Post Details", post });
    }).catch((err) => {
        logger.error(err);
    });
}

exports.postEdit = (req, res) => {
    models.Post.findByPk(req.params.id).then((post) => {
        res.render('post/edit.hbs', { user: req.user.dataValues, title: "Edit Post", post });
    }).catch((err) => {
        logger.error(err);
    });
}

exports.updatePost = (req, res) => {
    const file = req.file;

    const data = {
        title: req.body.title,
        content: req.body.description,
        avatar:  file ? file.filename : null,
    }

    console.log(data);

    // remove null values from data
    Object.keys(data).forEach(key => data[key] == null ? delete data[key] : '');

    models.Post.update({
        ...data
    }, {
        where: {
            id: req.params.id
        }
    }).then((post) => {
        res.redirect('/posts');
    }).catch((err) => {
        logger.error(err);
    });
}

exports.deletePost = (req, res) => {
    models.Post.destroy({
        where: {
            id: req.params.id
        }
    }).then((post) => {
        res.redirect('/posts');
    }).catch((err) => {
        logger.error(err);
    });
}