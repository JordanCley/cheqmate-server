require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan"); // used to see requests
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
// require("./bootstrap")();

// LOGIN ROUTE
app.post("/api/login", (req, res) => {
  console.log(req.body.email, req.body.password);
  auth
    .logUserIn(req.body.email, req.body.password)
    .then((dbUser) => res.json(dbUser))
    .catch((err) => res.status(400).json(err));
});

// SIGNUP ROUTE
app.post("/api/signup", (req, res) => {
  const user = passwordHash.createHash(req.body);
  console.log(user);
  db.User.create(user)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get("/api/user/:id", isAuthenticated, (req, res) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch((err) => res.status(400).send(err));
});

// getting all products/app items ****
app.get("/api/products", (req, res) => {
  db.Product.findAll()
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: "No products found" });
      }
    })
    .catch((err) => res.status(400).send(err));
});

// post route to create order from cart
app.post("/api/order/new", isAuthenticated, (req, res) => {
  const user = req.user.id;
  let itemNum = 0;
  req.body.items.map(item => {itemNum += item.quantity})
  db.Order.create({ user_id: user, ...req.body, total_items: itemNum })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

// // getting all orders for loggedIn user
// app.get("/api/order/view_all", isAuthenticated, (req, res) => {
//   db.Order.find({ userId: req.user.id, isPaid: true })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).json(err));
// });

// // update order isPaid to true after payment
// app.put("/api/order/:id", isAuthenticated, (req, res) => {
//   db.Order.findByIdAndUpdate(req.params.id, { ...req.body, isPaid: true })
//     .then((data) => res.json(data))
//     .catch((err) => res.status(400).json(err));
// });

// app.get(
//   "/",
//   isAuthenticated /* Using the express jwt MW here */,
//   (req, res) => {
//     res.send("You are authenticated"); //Sending some response when authenticated
//   }
// );

// // Error handling
// app.use(function (err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     // Send the error rather than to show it on the console
//     res.status(401).send(err);
//   } else {
//     next(err);
//   }
// });

// // Send every request to the React app
// // Define any API routes before this runs
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
