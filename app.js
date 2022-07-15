/**
 * Name: App (The beginning of the program)!
 * Description:
 * TODO: error occurring here in authentication.controller.js
 */
 const path = require('path'); // builtin path package
const express = require('express'); // require express
const app = express(); // creating an object of express
const csurf = require('csurf') // require csurf to protect csrf attack

const authenticationRoutes = require('./routes/authentication.routes'); // requiring authentication routes
const db = require('./database/database');
const addCSRFToken = require('./middlewares/csrf-token') ;
const errorHandlerMiddleware = require('./middlewares/error-handler'); // custom middleware for handling errors
// Templeting engine
app.set('view engine', 'ejs'); // set up view engine
app.set('views', path.join(__dirname, 'views')); // pointing to views / where to find the views
// Middleware
app.use(express.static('public')); // statically serve css and scripts
app.use(express.urlencoded({ extended: false })); // handle income data attached to the request
app.use(csurf()); // execute as a function in middleware
app.use(addCSRFToken); // it describes generated tokens to all the other middleware and routes
app.use(errorHandlerMiddleware);
// Routes Middleware
app.use(authenticationRoutes); // authentication router middleware




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

