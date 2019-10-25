var express = require('express');
var router = express.Router();
let {
  viewPersediaan,
  actionPersediaanCreate
} = require("../controllers/persediaanBarangController")

const auth = require("../middlewares/auth")

router.get("/", auth.isLogin, viewPersediaan)
router.post("/create", actionPersediaanCreate)


module.exports = router;
