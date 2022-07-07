/**
 * Name: Authentication Controllers
 * Description:
 */
const User = require('../models/user.model');
// Get Signup || /signup
function getSignup(req, res) {
  res.render('customer/authentication/signup');
}
//
async function signup(req, res) {
  const user = new User(
    // TODO: error occurring here
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.postal,
    req.body.city
  );

  await user.signup();

  res.redirect('/login');
}
// Get Login || /login
function getLogin(req, res) {
  res.render('customer/authentication/login');
}

// Export Authentication Controllers
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
