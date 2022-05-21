//! Dependencies
const express = require('express'); // express
const app = express(); // Creating express function
const csrf = require('csurf'); // csurf for protecting from csrf attact
const ejs = require('ejs'); // ejs
const path = require('path'); // build in path
const expressSession = require('express-session');


// Importing dependencies
const authRoutes = require('./routes/auth.routes'); // auth routes
const db = require('./database/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');//
const errorHandlerMiddleware = require('./middlewares/error-handler');
const createSessionConfig = require('./config/session');



//! Middleware
app.use(express.static('public')); // use public folder for static files
app.use(express.urlencoded({ extended: false })); // to recognize incoming request object

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig)); // do all the session management
app.use(csrf()); // all incoming req that are not get req will need a csrf token attached.
app.use(addCsrfTokenMiddleware)

app.use(authRoutes); // auth route

app.use(errorHandlerMiddleware); // error handler middleware
// SET function
app.set('view engine', 'ejs'); // set view engine to ejs
app.set('views', path.join(__dirname, 'views')); // add views to path

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
