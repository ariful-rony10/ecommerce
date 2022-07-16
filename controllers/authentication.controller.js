/**
 * Name: Authentication Controllers
 * Description:
 */
const User = require('../models/user.model');
const authUtil = require('../util/authentication');
// Get Signup || /signup
function getSignup(req, res) {
  res.render('customer/authentication/signup');
}
//
async function signup(req, res, next) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/login');
}
// Get Login || /login
function getLogin(req, res) {
  res.render('customer/authentication/login');
}

// Logged in a user // /login
async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    res.redirect('/login');
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    res.redirect('/login');
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthenticationSession(req);
  res.redirect('/');
}

// Export Authentication Controllers
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
