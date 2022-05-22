/**
 * Name: authentication.js
 * Description: 
 */


function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.save(action);
}


// Export module
module.exports = {
    createUserSession: createUserSession
}