var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "Everything's Working!" });
});

module.exports = router;
