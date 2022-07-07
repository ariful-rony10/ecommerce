/**
 * Name: Authentication routes
 * Description:
 */

// Dependencies
const express = require('express');
const authenticationRouter = express.Router();
const authenticationController = require('../controllers/authentication.controller');

// GET signup page
authenticationRouter.get('/signup', authenticationController.getSignup);

// GET login page
authenticationRouter.get('/login', authenticationController.getLogin);

module.exports = authenticationRouter;
