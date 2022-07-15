/**
 * Name: Authentication Controllers
 * Description:
 */
const User = require('../models/user.model');
const authUtil = require('../util/authentication')
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

// Logged in a user // /login 
async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();
  if (!existingUser) {
    res.redirect('/login');
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

  if(!passwordIsCorrect) {
    res.redirect('/login');
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/');
  })

} 



// Export Authentication Controllers
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
