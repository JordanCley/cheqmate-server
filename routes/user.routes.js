const router = require("express").Router();

const UserController = require("../controllers/user.controllers");

router.post("/signup", UserController.signUp);
router.get("/user", UserController.getUser);

module.exports = router;
