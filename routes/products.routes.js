/**
 * Name: Products routes
 * Description:
 */

// Dependencies
const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/products', function (req, res) {
  res.render('customer/products/all-products')
})


module.exports = productsRouter;
