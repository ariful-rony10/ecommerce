/**
 * Name: Base Routes
 * Description: 
 */

// Dependencies
const express = require('express'); // express
const authController = require('../controllers/auth.controller'); // authController 



// Creating router function from express
const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/products')
})


// Export Router
module.exports = router;
