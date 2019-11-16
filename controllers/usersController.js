const { User } = require("../models");
const bcrypt = require("bcryptjs");
const Op = require("sequelize").Op;

/* GET login page from template adminlte. */
exports.viewSignin = async (req, res) => {
  res.render("index", { action: "false" });
}

exports.actionLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: { [Op.eq]: username } } });

  if (user) {
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        status: user.status
      }
      console.log(req.session.user)
      if (user.role === "admin") {
        res.redirect("/admin");
      } else if (user.role === "guru") {
        res.redirect("/pimpinan");
      }
    } else {
      res.render("login", { action: "view" });
      res.redirect("/signin");
    }
  } else {
    res.render("login", { action: "view" });
  }
}

/**
 * action logout
 * get
 * /logout
 */
exports.actionLogout = async (req, res) => {
  req.session.destroy()
  res.redirect('/signin');
}