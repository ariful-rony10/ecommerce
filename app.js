/**
 * Name: App (The beginning of the program)! 
 * Description: 
 */

const express = require('express'); 
const path = require('path'); 
const app = express(); 
const authenticationRoutes = require('./routes/authentication.routes'); // requiring authentication routes

// Templeting engine

// Middleware
app.use(authenticationRoutes); // authentication router middleware


app.PORT = process.env.PORT || 3000;

app.listen(app.PORT, () => `Listening on port: ${app.PORT}`);
