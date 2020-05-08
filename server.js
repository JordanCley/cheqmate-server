
require("dotenv").config();
require("./database/connection");

const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
// const https = require('https');
// const fs = require('fs');

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes");

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/", productRoutes);

// Un-Comment and create an SSL Cert when on EC2

// https.createServer({
//   key: fs.readFileSync("/etc/letsencrypt/live/api.cheqmate.app/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/api.cheqmate.app/fullchain.pem")
// }, app).listen(443);

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
