const db = require("../models");

function createOrder(req, res) {
  const user = req.user.id;
  const order = { user_id: user, ...req.body };
  let totalItems = 0;
  req.body.order_items.map((item) => {
    totalItems += item.quantity;
  });
  db.Order.create(
    { ...order, total_items: totalItems },
    {
      include: [{ model: db.OrderItem, as: "order_items" }],
    }
  )
    .then((createdOrder) => res.json(createdOrder))
    .catch((err) => res.status(400).json(err));
}

function getPastOrders(req, res) {
  const user = req.user.id;
  db.Order.findAll(
    { where: { user_id: user, is_paid: true } },
    {
      include: [{ model: db.OrderItem, as: "order_items" }],
    }
  )
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
}

function getPastOrder(req, res) {
  const user = req.user.id;

  db.Order.findOne({
    where: { id: req.params.id, user_id: user },
    include: [{ all: true, nested: true }],
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
}

function getOpenOrder(req, res) {
  const user = req.user.id;
  db.Order.findOne({
    where: { id: req.params.id, user_id: user, is_paid: true },
    include: [{ all: true, nested: true }],
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
}

function updateOrderPaid(req, res) {
  db.Order.update(
    { is_paid: true, ...req.body },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedResponse) => res.json(updatedResponse))
    .catch((err) => res.status(400).json(err));
}

module.exports = {
  createOrder: createOrder,
  getPastOrders: getPastOrders,
  getPastOrder: getPastOrder,
  getOpenOrder: getOpenOrder,
  updateOrderPaid: updateOrderPaid,
};
