/**
 * Name: Authentication routes
 * Description:
 */

// Dependencies
const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication.controller');

// GET signup page
router.get('/signup', authenticationController.getSignup);

// POST sign up
router.post('/signup', authenticationController.signup);

// GET login page
router.get('/login', authenticationController.getLogin);

// POST login
router.post('/login', authenticationController.login);

// POST logout
router.post('/logout', authenticationController.logout);

module.exports = router;
