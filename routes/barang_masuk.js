var express = require('express');
var router = express.Router();
let {
  viewBarang,
} = require("../controllers/barangMasukController")

const auth = require("../middlewares/auth")

router.get("/", viewBarang)


module.exports = router;
