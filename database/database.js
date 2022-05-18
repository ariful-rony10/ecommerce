/**
 * Name: database.js
 * Description: contains all the requred codes to connect with the database.
 */
// Dependemcies
const mongodb = require('mongodb'); // Mongodb

// Create a mongoClient
const MongoClient = mongodb.MongoClient;

// Declared variables
let database;

// connection to database function
async function connectToDatabase() {
 const client = await  MongoClient.connect('mongodb://127.0.0.1:27017');
 database = client.db('ecommerce');
}


// Get database 
function getDb() {
    if(!database){
        throw new Error('You must connect with database first!');
    }
    return database;
}

// Export module
module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}