/**
 * Name: Check Authentication JS (Middleware)
 * Description: 
 */
function checkAuthenticationStatus (req, res, next) {
  const uid = req.session.uid; // get session uid 
  if(!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuthenticated = true;
  next();
}

module.exports = checkAuthenticationStatus;