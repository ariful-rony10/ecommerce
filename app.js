/**
 * Name: App (The beginning of the program)!
 * Description:
 */
 const path = require('path'); // builtin path package
const express = require('express'); // require express
const app = express(); // creating an object of express
const csurf = require('csurf') // require csurf to protect csrf attack
const expressSession = require('express-session') // required express session




const authenticationRoutes = require('./routes/authentication.routes'); // requiring authentication routes
const productsRoutes = require('./routes/products.routes'); // requiring products routes
const baseRoutes = require('./routes/base.routes'); // requiring base routes
const db = require('./database/database');
const addCSRFTokenMiddleware = require('./middlewares/csrf-token') ;
const errorHandlerMiddleware = require('./middlewares/error-handler'); // custom middleware for handling errors
const createSessionConfig = require('./config/session') // requiring session 
const sessionConfig = createSessionConfig(); // creating an object of session
const checkAuthenticationStatusMiddleware = require('./middlewares/check-authentication')






// Templeting engine
app.set('view engine', 'ejs'); // set up view engine
app.set('views', path.join(__dirname, 'views')); // pointing to views / where to find the views



// ! Middleware
app.use(express.static('public')); // statically serve css and scripts
app.use(express.urlencoded({ extended: false })); // handle income data attached to the request
app.use(expressSession(sessionConfig));
app.use(csurf()); // execute as a function in middleware
app.use(addCSRFTokenMiddleware); // it describes generated tokens to all the other middleware and routes
app.use(checkAuthenticationStatusMiddleware); // check is user authenticated or not (must be after session config)



// Routes Middleware
app.use(baseRoutes)
app.use(authenticationRoutes); // authentication router middleware
app.use(productsRoutes) 
app.use(errorHandlerMiddleware); // for handling errors



app.PORT = process.env.PORT || 3000; // listening port
// Database
db.connectToDatabase()
  .then(function () {
    app.listen(app.PORT, () => `Listening on port: ${app.PORT}`);
  })
  .catch(function (error) {
    console.log(`Failed to connect to databse!`);
    console.log(error);
  });

