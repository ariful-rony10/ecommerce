/**
 * Name: Authentication Controllers
 * Description:
 */

// Get Signup || /signup
function getSignup(req, res) {
  res.render('customer/authentication/signup')
}
// 
function signup(req, res) {
  
}
// Get Login || /login
function getLogin(req, res) {
  res.render('customer/authentication/login')
}

// Export Authentication Controllers
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup
}
