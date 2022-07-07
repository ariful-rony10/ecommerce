/**
 * Name: Authentication Controllers
 * Description:
 */

// Get Signup
function getSignup(req, res) {
  // .....
  res.render('/')
}

// Get Login
function getLogin(req, res) {
  // .....
  res.render('/')
}

// Export Authentication Controllers
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin
}
