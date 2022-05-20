/**
 * Name: Auth Controller
 * Description:
 */

// Dependencies
const User = require('../models/user.model'); // importing user model

function getSignup(req, res) {
  res.render('customer/auth/signup');
}
async function signup(req, res) {
  const user = new User(
    //   Parsed from signup form request
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );
//   Calling signup method from user model
  await user.singup();

  res.redirect('/login');
}
function getLogin(req, res) {
    res.render('customer/auth/login')
}

// exports auth controller functions as an object

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
