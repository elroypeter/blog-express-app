const PostLikeModel = (db, sequelize) => {
    const PostLike = db.define('PostLike', {});
    return { PostLike };
}

module.exports = PostLikeModel;