const UserModel = (db, sequelize) => {
    const User = db.define('User', {
        name: {
            type: sequelize.STRING,
            allowNull: false
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        avatar: {
            type: sequelize.STRING,
            allowNull: true
        },
    });
    return { User };
}

module.exports = UserModel;