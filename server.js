require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const db = require("./models");
const PORT = process.env.PORT || 3001;

const isAuthenticated = require("./authConfig/isAuthenticated");
const auth = require("./authConfig/auth");
const passwordHash = require("./authConfig/passwordHash");

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

//log all requests to the console
app.use(morgan("dev"));

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// DB Connection
require("./database/connection");

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  auth
    .logUserIn(req.body.email, req.body.password)
    .then((dbUser) => res.json(dbUser))
    .catch((err) => res.status(400).json(err));
});

// SIGNUP ROUTE
app.post("/api/signup", (req, res) => {
  const user = passwordHash.createHash(req.body);
  db.User.create(user)
    .then((newUser) => res.json(newUser))
    .catch((err) => res.status(400).json(err));
});

// get user
app.get("/api/user/:id", isAuthenticated, (req, res) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch((err) => res.status(400).send(err));
});

// get all products
app.get("/api/products", (req, res) => {
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
app.post("/api/order/new", isAuthenticated, (req, res) => {
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
});

// getting all orders for loggedIn user
app.get("/api/order/view_all_past_orders", isAuthenticated, (req, res) => {
  const user = req.user.id;
  db.Order.findAll(
    { where: { user_id: user, is_paid: true } },
    {
      include: [{ model: db.OrderItem, as: "order_items" }],
    }
  )
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// getting open check
app.get("/api/order/open_order/:id", isAuthenticated, (req, res) => {
  const user = req.user.id;
  db.Order.findOne({
    where: { id: req.params.id, user_id: user, is_paid: true },
    include: [{ all: true, nested: true }],
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// getting one past order
app.get("/api/order/view_past_order/:id", isAuthenticated, (req, res) => {
  const user = req.user.id;

  db.Order.findOne({
    where: { id: req.params.id, user_id: user },
    include: [{ all: true, nested: true }],
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// update order after payment
app.put("/api/update_order_paid/:id", isAuthenticated, (req, res) => {
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
});

app.get("/", isAuthenticated, (req, res) => {
  res.send("You are authenticated");
});

// Error handling
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// // Send every request to the React app
// // Define any API routes before this runs
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./cheqmate-client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
