const PostModel = (db, sequelize) => {
    const Post = db.define('Post', {
        title: {
            type: sequelize.STRING,
            allowNull: false
        },
        content: {
            type: sequelize.TEXT,
            allowNull: false
        },
        cover_image: {
            type: sequelize.STRING,
            allowNull: true
        }
    });
    return { Post };
}

module.exports = PostModel;