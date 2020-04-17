"use strict";

const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
      hooks: {
        beforeCreate: function (user, callback) {
          if (!user.changed("password")) return callback();
          bcrypt.genSaltSync(5, function (err, salt) {
            if (err) return callback(err);
            bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) return callback(err);
              user.password = hash;
              callback();
            });
          });
        },
      },
      underscored: true,
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Order, {
      as: "orders",
      foreignKey: { name: "user_id", allowNull: false },
    });
  };
  return User;
};
