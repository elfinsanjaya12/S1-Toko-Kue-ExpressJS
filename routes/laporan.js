var express = require('express');
var router = express.Router();
let {
  viewBarang,
} = require("../controllers/laporanController")

const auth = require("../middlewares/auth")

router.get("/", auth.isLogin, viewBarang)


module.exports = router;
