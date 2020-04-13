const bcrypt = require("bcrypt-nodejs");

module.exports = {
    comparePassword: function(comparedPassword, password, callback) {
        bcrypt.compare(comparedPassword, password, function(err, isMatch) {
          if (err) return callback(err);
          callback(null, isMatch);
        });
      },
}