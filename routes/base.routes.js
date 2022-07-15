/**
 * Name: Base routes
 * Description:
 */

// Dependencies
const express = require('express');
const baseRouter = express.Router();

baseRouter.get('/', function (req, res) {
  res.redirect('/products')
})


module.exports = baseRouter;
