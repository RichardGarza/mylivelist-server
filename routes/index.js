var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/home", function(req, res, next) {
  res.json([
    { id: 1, name: "patricia" },
    { id: 2, name: "patrick" },
    { id: 3, name: "Joanna" },
    { id: 4, name: "Yellow" }
  ]);
});

module.exports = router;
