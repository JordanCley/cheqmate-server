"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // order_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   set(value){
      //     this.setDataValue("order_id", value)
      //   }
      // },
    },
    { underscored: true }
  );

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      as: "order",
      foreignKey: { name: "order_id", allowNull: false },
    });
    OrderItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: { name: "product_id", allowNull: false },
    });
  };
  return OrderItem;
};
