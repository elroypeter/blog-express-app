const { models } = require('../index');
const { logger } = require('../config/logger');

exports.saveComment = (req, res) => {
    models.Comment.create({
        content: req.body.description,
        PostId: req.body.postId,
        UserId: req.user.dataValues.id,
    }).then((comment) => {
        res.redirect(`/posts/${req.body.postId}`);
    }).catch((err) => {
        logger.error(err);
    });
}