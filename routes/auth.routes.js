const router = require("express").Router();
const isAuthenticated = require("../authConfig/isAuthenticated");
const AuthController = require("../controllers/auth.controllers");

router.post("/login", AuthController.login);

router.get("/", isAuthenticated, AuthController.authenticate);

module.exports = router;
