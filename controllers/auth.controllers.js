const auth = require("../authConfig/auth");

function login (req, res) {
    auth
    .logUserIn(req.body.email, req.body.password)
    .then((dbUser) => res.json(dbUser))
    .catch((err) => res.status(400).json(err));
}

function authenticate (req, res){
    res.send("You are authenticated");
}

module.exports = {
    login: login,
    authenticate: authenticate
  };