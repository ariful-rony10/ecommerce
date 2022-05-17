// Dependencies
const express = require('express'); // express
const authRoutes = require('./routes/auth.routes'); // auth routes

// Middleware
app.use(authRoutes)

// Creating express function
const app = express();



// Listening port
app.listen(3000);