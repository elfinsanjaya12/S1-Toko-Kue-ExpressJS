var express = require('express');
var router = express.Router();
let {
  viewBarangMasuk,
  actionCreate,
  actionBarangMasukDetele
} = require("../controllers/barangMasukController")

const auth = require("../middlewares/auth")

router.get("/", auth.isLogin, viewBarangMasuk)
router.post("/create", actionCreate)
router.get("/delete/:id", actionBarangMasukDetele)


module.exports = router;
