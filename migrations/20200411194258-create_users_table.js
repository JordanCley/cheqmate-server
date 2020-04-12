"use strict";

const bcrypt = require("bcrypt-nodejs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
          trim: true,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
          trim: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          trim: true,
          unique: true,
          lowercase: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
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
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("users");
  },
};
