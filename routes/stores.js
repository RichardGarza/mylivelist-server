var express = require("express");
var router = express.Router();
const storeController = require("../controllers/storeController");

router.post("/getStores", storeController.getAll);
router.post("/addStore", storeController.create);

module.exports = router;
