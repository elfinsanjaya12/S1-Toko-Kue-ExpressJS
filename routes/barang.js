var express = require('express');
var router = express.Router();
let {
  viewBarang
} = require("../controllers/barangController")

router.get("/barang", viewBarang)


module.exports = router;
