const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
const bcrypt = require("bcrypt-nodejs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER(11),
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
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
    hooks: {
      beforeCreate: function (user) {
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    underscored: true,
  }
);

module.exports = User;
