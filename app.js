/**
 * Name: App (The beginning of the program)!
 * Description:
 * TODO: error occurring here in authentication.controller.js
 */
const express = require('express'); // require express
const path = require('path'); // builtin path package
const app = express(); // creating an object of express
const authenticationRoutes = require('./routes/authentication.routes'); // requiring authentication routes
const db = require('./database/database');

// Templeting engine
app.set('view engine', 'ejs'); // set up view engine
app.set('views', path.join(__dirname, 'views')); // pointing to views / where to find the views
// Middleware
app.use(express.static('public')); // statically serve css and scripts
app.use(authenticationRoutes); // authentication router middleware
app.use(express.urlencoded({extended: false})); // handle income data attached to the request

app.PORT = process.env.PORT || 3000;
// Database
db.connectToDatabase()
  .then(function () {
    app.listen(app.PORT, () => `Listening on port: ${app.PORT}`);
  })
  .catch(function (error) {
    console.log(`Failed to connect to databse!`);
    console.log(error);
  });

