"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      total_items: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      subtotal: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
      },
      gratuity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tax: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
        defaultValue: 7.25,
      },
      grand_total: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
        defaultValue: 0
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("orders");
  },
};
