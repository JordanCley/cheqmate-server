module.exports = async () => {
  const db = await require("./models");

  db.User.hasMany(db.Order, { as: "Orders", foreignKey: "user_id" });
  db.Order.belongsTo(db.User, { as: "User", foreignKey: "user_id" });

  db.Order.hasMany(db.OrderItem, { as: "Order_Items", foreignKey: "order_id" });
  db.OrderItem.belongsTo(db.Order, { as: "Order", foreignKey: "order_id" });

  db.Product.belongsTo(db.OrderItem, {
    as: "Order_Item",
    foreignKey: "product_id",
  });

  const user = {
    first_name: "Jordan",
    last_name: "McQuiston",
    password: "password",
    email: "jordan@jordanmcquiston.com",
  };

  const product = {
    image_url: "www.someImage.com",
    product_name: "Bloomin' Onion",
    description: `An Outback original! Our special onion is hand-carved, 
      cooked until golden and ready to dip into our spicy 
      signature bloom sauce.`,
    price: 8.99,
  };

  // const orderItem = {
  //   quantity: 4,
  // };

  // const order = {
  //   total_items: 4,
  //   total: 24.67,
  //   gratuity: 20,
  //   tax: 9.9,
  //   grand_total: 29.6,
  //   table_number: "A3452",
  //   is_paid: false,
  // };

  const errHandler = (err) => {
    console.error("Error", err);
  };

  const newUser = await db.User.create(user).catch(errHandler);
  const newProduct = await db.Product.create(product).catch(errHandler);
  // const newOrder = await db.Order.create({
  //   user_id: newUser.id,
  //   ...order,
  // }).catch(errHandler);
  // const newOrderItem = await db.orderItem
  //   .create({ order_id: newOrder.id, product_id: newProduct.id, ...orderItem })
  //   .catch(errHandler);
  // console.log(newOrderItem);

  // const users = await db.User.findAll({
  //   where: { first_name: user.first_name },
  //   include: [{ model: db.Order, as: "Orders" }],
  // }).catch(errHandler);

  console.log(`Jordan's Orders:`, newUser, newProduct);
};
