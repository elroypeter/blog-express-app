const bcrypt = require('bcrypt');

exports.verifyPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}