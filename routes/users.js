var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.create);

router.get("/users", (req, res, next) => {
  res.json({ message: "Users page Working!" });
});

module.exports = router;
