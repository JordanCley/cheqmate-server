"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      total_items: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gratuity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 9.9,
      },
      grand_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      table_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { underscored: true }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      as: "user",
      foreignKey: { name: "user_id", allowNull: false },
    });
    Order.hasMany(models.OrderItem, {
      as: "order_items",
      foreignKey: { name: "order_id", allowNull: false },
    });
  };
  return Order;
};
