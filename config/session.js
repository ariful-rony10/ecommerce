const mongoDbStore = require('connect-mongodb-session');
const expressSession = require('express-session')

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession);

    const store = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'ecommerce',
        collection: 'sessions'
    });

    return store;
}

// Create a config for the session also return in object because express session wants it as ab object
function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 1000, //means 2 days (must be in millisecond)
        }
    };
}

module.exports = createSessionConfig;