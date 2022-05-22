//! Dependencies
const express = require('express'); // express
const app = express(); // Creating express function
const csrf = require('csurf'); // csurf for protecting from csrf attact
const ejs = require('ejs'); // ejs
const path = require('path'); // build in path
const expressSession = require('express-session');


// Importing dependencies
const createSessionConfig = require('./config/session');
const db = require('./database/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');//
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth'); // check auth middleware
const authRoutes = require('./routes/auth.routes'); // auth routes
const productRoutes = require('./routes/products.routes'); // products routes
const baseRoutes = require('./routes/base.routes'); // base routes



//! Middleware

app.set('view engine', 'ejs'); // set view engine to ejs
app.set('views', path.join(__dirname, 'views')); // add views to path

app.use(express.static('public')); // use public folder for static files
app.use(express.urlencoded({ extended: false })); // to recognize incoming request object


const sessionConfig = createSessionConfig();


app.use(expressSession(sessionConfig)); // do all the session management
app.use(csrf()); // all incoming req that are not get req will need a csrf token attached.

app.use(addCsrfTokenMiddleware) // add csrf token to middlewaares

app.use(checkAuthStatusMiddleware); // check auth

app.use(baseRoutes); // base route
app.use(authRoutes); // auth route
app.use(productRoutes); // product route

app.use(errorHandlerMiddleware); // error handler middleware
// SET function


// Connect with the database
db.connectToDatabase()
  .then(function () {
    // Listening port
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  })
  .catch(function (error) {
    console.log('Failed to connect with the database!');
    console.log(error);
  });
