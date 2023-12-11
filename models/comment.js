const CommentModel = (db, sequelize) => {
    const Comment = db.define('Comment', {
        content: {
            type: sequelize.TEXT,
            allowNull: false
        },
    });
    return { Comment };
}

module.exports = CommentModel;