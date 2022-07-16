/**
 * Name: Authentication.js
 * Description: This will add a uid to the session.
 */
function createUserSession (req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
}
// Destroy user authentication session 
function destroyUserAuthenticationSession(req) {
  req.session.uid = null;
}
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthenticationSession: destroyUserAuthenticationSession
}