/**
 * Name: Authentication Controllers
 * Description:
 */
const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');
// Get Signup || /signup
function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: '',
    };
  }
  res.render('customer/authentication/signup', { inputData: sessionData });
}
//
async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postalcode,
    city: req.body.city,
  };
  // Validation
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postalcode,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body['confirm-email']) // "-" is not allowed in js property names
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          'Please check your input. Password must be 6 characters long, postal code must be 4 characters long',
        ...enteredData,
      },
      function () {
        res.redirect('/signup');
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  try {
    // Checking user existence
    const existsAlready = await user.userAlreadyExists();
    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'User exits already! - Try logging in instead.',
          ...enteredData,
        },
        function () {
          res.redirect('/signup');
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/login');
}
// Get Login || /login
function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    };
  }
  res.render('customer/authentication/login', { inputData : sessionData });
}

// Logged in a user || /login
async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }
  const sessionErrorData = {
    errorMessage:
      'Invalid credentials! - Please double check the email and password.',
    email: user.email,
    password: user.password,
  };
  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
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
