var express = require('express');
var router = express.Router();
let {
  viewBarang,
  viewPersediaan
} = require("../controllers/pimpinanController")

const auth = require("../middlewares/auth")

router.get("/laporan", auth.isLogin, viewBarang)
router.get("/persediaan-barang", auth.isLogin, viewPersediaan)


module.exports = router;
