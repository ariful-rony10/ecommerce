/**
 * Name: Auth Routes
 * Description:
 */

// Dependencies
const express = require('express'); // express
const authController = require('../controllers/auth.controller'); // authController 


// Creating router function from express
const router = express.Router();

//! Sign Up GET route
router.get('/signup', authController.getSignup);

// ! Sign Up post form
router.post('/signup', authController.signup)

//! Login GET route
router.get('/login', authController.getLogin);

// Export Router
module.exports = router;
