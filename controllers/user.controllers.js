const db = require("../models");
const passwordHash = require("../authConfig/passwordHash");

function signUp(req, res) {
  const user = passwordHash.createHash(req.body);
  db.User.create(user)
    .then((newUser) => res.json(newUser))
    .catch((err) => res.status(400).json(err));
}

function getUser(req, res) {
  db.User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ success: false, message: "No user found" });
      }
    })
    .catch((err) => res.status(400).send(err));
}

module.exports = {
  signUp: signUp,
  getUser: getUser,
};
