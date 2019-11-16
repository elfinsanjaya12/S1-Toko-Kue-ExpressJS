var express = require('express');
var router = express.Router();

const auth = require("../middlewares/auth")

/* GET home page. */
router.get('/', auth.isLogin, function (req, res, next) {
  res.redirect("/admin")
});

router.get('/admin', auth.isLogin, function (req, res, next) {
  res.render('admin/dashboard/dashboard', {
    title: "Home", action: "view"
  });
});

module.exports = router;
