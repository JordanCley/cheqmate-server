"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      total_items: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gratuity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tax: {
        type: DataTypes.FLOAT(10,2),
        allowNull: false,
        defaultValue: 7.25,
      },
      grand_total: {
        type: DataTypes.FLOAT(10,2),
        allowNull: false,
        defaultValue: 0
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
