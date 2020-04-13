const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define(
  "Product",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);
