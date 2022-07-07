/**
 * Name: App (The beginning of the program)!
 * Description:
 */
const express = require('express'); // require express
const path = require('path'); // builtin path package
const app = express(); // creating an object of express
const authenticationRoutes = require('./routes/authentication.routes'); // requiring authentication routes

// Templeting engine
app.set('view engine', 'ejs'); // set up view engine
app.set('views', path.join(__dirname, 'views')); // pointing to views / where to find the views
// Middleware
app.use(authenticationRoutes); // authentication router middleware

app.PORT = process.env.PORT || 3000;

app.listen(app.PORT, () => `Listening on port: ${app.PORT}`);
