const db = require("../models");
const jwt = require("jsonwebtoken");
const verifyPassword = require("./verifyPassword");

module.exports = {
  logUserIn: function (email, password) {
    return new Promise((resolve, reject) => {
      db.User.findOne({
        where: {
          email: email,
        },
      })
        .then((user) => {
          verifyPassword.comparePassword(password, user.password, function (
            err,
            isMatch
          ) {
            if (isMatch && !err) {
              let token = jwt.sign(
                { id: user.id, first_name: user.first_name, email: user.email },
                process.env.SERVER_SECRET,
                { expiresIn: 129600 }
              ); // Signing the token
              resolve({
                success: true,
                message: "Token Issued!",
                token: token,
                user: user,
              });
            } else {
              reject({
                success: false,
                message: "Authentication failed. Wrong password.",
              });
            }
          });
        })
        .catch((err) =>
          reject({ success: false, message: "User not found", error: err })
        );
    });
  },
};
