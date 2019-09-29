var express = require('express');
var router = express.Router();
let {
  viewBarang,
  actionCreate,
  actionDetele,
  actionUpdate
} = require("../controllers/barangController")

const auth = require("../middlewares/auth")

router.get("/barang", auth.isLogin, viewBarang)
router.post("/barang/create", actionCreate)
router.post("/barang/update", actionUpdate)
router.get("/barang/delete/:id", actionDetele)


module.exports = router;
