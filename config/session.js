const expressSession = require('express-session')
const mongoDbStore = require('connect-mongodb-session');
function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);
  const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017',
    databaseName: 'ecommerce',
    collection: 'sessions'
  })
  return store;
}

function createSessionConfig() {
  return {
    secret: 'pxN7aJTgxGEvPq',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days (values in millisecond)
    }
  };
}

module.exports = createSessionConfig;