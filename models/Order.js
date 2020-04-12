const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define(
  "Order",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    total_items: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gratutity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 9.9,
    },
    grand_total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    table_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_paid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    underscored: true,
  }
);
