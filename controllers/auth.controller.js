/**
 * Name: Auth Controller
 * Description:
 */

// Dependencies
const User = require('../models/user.model'); // importing user model

const authUtil = require('../util/authentication') // importing authentication 

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
// Get Login page
function getLogin(req, res) {
  res.render('customer/auth/login');
}
// 
async function login(req, res) {
  // Checking is the user exists or not
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  // If user doesn't exists
  if(!existingUser) {
    res.redirect('/login');
    return;
  }
  // Check if password if correct or not
  const passwrodIsCorrect = await user.hasMachingPassword(existingUser.password);
  // If password is correct
  if(!passwrodIsCorrect){
    res.redirect('/login');
    return;
  }

  // after saving user data direcet user
  authUtil.createUserSession(req, existingUser, function(){
    res.redirect('/');
  });


}

// exports auth controller functions as an object

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
