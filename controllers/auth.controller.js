/**
 * Name: Auth Controller
 * Description:
 */

function getSignup(req, res) {
    res.render('customer/auth/signup');
}
function signup(req, res) {
        
}
function getLogin(req, res) {

}


// exports auth controller functions as an object

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup
}