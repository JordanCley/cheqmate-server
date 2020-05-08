const db = require("../models");

function getProducts(req, res) {
  db.Product.findAll()
    .then((products) => {
      if (products) {
        res.json(products);
      } else {
        res.status(404).send({ success: false, message: "No products found" });
      }
    })
    .catch((err) => res.status(400).send(err));
}

module.exports = {
  getProducts: getProducts,
};
