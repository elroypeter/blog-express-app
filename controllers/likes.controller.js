const { models } = require('../index');
const { logger } = require('../config/logger');

exports.saveLike = (req, res) => {
    // check if user already liked the post
    models.PostLike.findOne({
        where: {
            PostId: req.params.id,
            UserId: req.user.dataValues.id,
        }
    }).then((like) => {
        if (like) {
            // user already liked the post, so unlike it
            models.PostLike.destroy({
                where: {
                    PostId: req.params.id,
                    UserId: req.user.dataValues.id,
                }
            }).then((like) => {
                res.redirect(`/posts`);
            }).catch((err) => {
                logger.error(err);
            });
        } else {
            // user has not liked the post, so like it
            models.PostLike.create({
                PostId: req.params.id,
                UserId: req.user.dataValues.id,
            }).then((like) => {
                res.redirect(`/posts`);
            }).catch((err) => {
                logger.error(err);
            });
        }
    }).catch((err) => {
        logger.error(err);
    });
}