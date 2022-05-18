// Dependencies
const express = require('express'); // express
const authRoutes = require('./routes/auth.routes'); // auth routes
const db = require('./database/database');
// Creating express function
const app = express();

const ejs = require('ejs'); // ejs
const path = require('path'); // build in path

// Middleware
app.use(authRoutes); // auth route
app.use(express.static('public')); // use public folder for static files

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

