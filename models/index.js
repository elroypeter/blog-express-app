const { Sequelize } = require("sequelize");

module.exports = (db) => {
    // Registering models
    const { User } = require('./user')(db, Sequelize);
    const { Post } = require('./post')(db, Sequelize);
    const { Comment } = require('./comment')(db, Sequelize);
    const { PostLike } = require('./post-like')(db, Sequelize);

    // define relationships here
    User.hasMany(db.models.Post);
    Post.belongsTo(db.models.User);
    User.hasMany(db.models.Comment);
    Comment.belongsTo(db.models.User);
    Post.hasMany(db.models.Comment);
    Comment.belongsTo(db.models.Post);
    User.hasMany(db.models.PostLike);
    PostLike.belongsTo(db.models.User);
    Post.hasMany(db.models.PostLike);
    PostLike.belongsTo(db.models.Post);

    return { User, Post, Comment, PostLike };
}