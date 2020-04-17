"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT(10,2),
        allowNull: false,
      },
    },
    { underscored: true }
  );

  Product.associate = function (models) {
    Product.hasOne(models.OrderItem, {
      as: "order_item",
      foreignKey: { name: "product_id", allowNull: false },
    });
  };
  return Product;
};
