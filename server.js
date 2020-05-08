require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./models");
const PORT = process.env.PORT || 3001;
// const isAuthenticated = require("./authConfig/isAuthenticated");
// const auth = require("./authConfig/auth");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");

// const passwordHash = require("./authConfig/passwordHash");

// const https = require('https');
// const fs = require('fs');

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

//log all requests to the console
app.use(morgan("dev"));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
require("./database/connection");

// get all products
app.get("/products", (req, res) => {
  db.Product.findAll()
    .then((products) => {
      if (products) {
        res.json(products);
      } else {
        res.status(404).send({ success: false, message: "No products found" });
      }
    })
    .catch((err) => res.status(400).send(err));
});

// create order
// app.post("/order/new", isAuthenticated, (req, res) => {
//   const user = req.user.id;
//   const order = { user_id: user, ...req.body };
//   let totalItems = 0;
//   req.body.order_items.map((item) => {
//     totalItems += item.quantity;
//   });
//   db.Order.create(
//     { ...order, total_items: totalItems },
//     {
//       include: [{ model: db.OrderItem, as: "order_items" }],
//     }
//   )
//     .then((createdOrder) => res.json(createdOrder))
//     .catch((err) => res.status(400).json(err));
// });

// getting all orders for loggedIn user
// app.get("/order/view_all_past_orders", isAuthenticated, (req, res) => {
//   const user = req.user.id;
//   db.Order.findAll(
//     { where: { user_id: user, is_paid: true } },
//     {
//       include: [{ model: db.OrderItem, as: "order_items" }],
//     }
//   )
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).json(err));
// });

// getting open check
// app.get("/order/open_order/:id", isAuthenticated, (req, res) => {
//   const user = req.user.id;
//   db.Order.findOne({
//     where: { id: req.params.id, user_id: user, is_paid: true },
//     include: [{ all: true, nested: true }],
//   })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).json(err));
// });

// getting one past order
// app.get("/order/view_past_order/:id", isAuthenticated, (req, res) => {
//   const user = req.user.id;

//   db.Order.findOne({
//     where: { id: req.params.id, user_id: user },
//     include: [{ all: true, nested: true }],
//   })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).json(err));
// });

// update order after payment
// app.put("/update_order_paid/:id", isAuthenticated, (req, res) => {
//   db.Order.update(
//     { is_paid: true, ...req.body },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedResponse) => res.json(updatedResponse))
//     .catch((err) => res.status(400).json(err));
// });

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

app.use("/", authRoutes);
app.use("/", orderRoutes);
app.use("/", userRoutes);

// unComment and create an SSL Cert when in EC2

// https.createServer({
//   key: fs.readFileSync("/etc/letsencrypt/live/api.cheqmate.app/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/api.cheqmate.app/fullchain.pem")
// }, app).listen(443);

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
