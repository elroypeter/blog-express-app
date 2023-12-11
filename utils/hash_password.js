const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}