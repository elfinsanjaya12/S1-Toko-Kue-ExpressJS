var express = require('express');
var router = express.Router();
let {
  viewBarang,
  actionCreate
} = require("../controllers/barangController")

router.get("/barang", viewBarang)
router.post("/barang/create", actionCreate)


module.exports = router;
