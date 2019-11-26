var express = require('express');
var router = express.Router();
let {
  viewFuzzy
} = require("../controllers/fuzzyController")

const auth = require("../middlewares/auth")

router.get("/fuzzy", auth.isLogin, viewFuzzy)


module.exports = router;
