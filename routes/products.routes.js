/**
 * Name: Products Routes
 * Description: 
 */

// Dependencies
const express = require('express'); // express
const authController = require('../controllers/auth.controller'); // authController 


// Creating router function from express
const router = express.Router();

router.get('/products', function (req, res) {
    res.render('customer/products/all-products')
})


// Export Router
module.exports = router;
