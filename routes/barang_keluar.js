var express = require('express');
var router = express.Router();
let {
  viewBarangKeluar,
  actionCreate
} = require("../controllers/barangKeluarController")

const auth = require("../middlewares/auth")

router.get("/", auth.isLogin, viewBarangKeluar)
router.post("/create", actionCreate)


module.exports = router;
