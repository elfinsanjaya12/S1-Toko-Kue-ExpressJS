const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    console.log(req.session.user)
    res.redirect('/signin');
  } else {
    next();
  }
}

module.exports = {
  isLogin: isLogin
};