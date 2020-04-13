const bcrypt = require("bcrypt-nodejs");

module.exports = {
    createHash: function (user) {
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        return user;
      },
}