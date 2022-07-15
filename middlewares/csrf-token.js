function addCSRFToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); // locals is a type of variable that is expose to all use 
  next();
}

module.exports = addCSRFToken;