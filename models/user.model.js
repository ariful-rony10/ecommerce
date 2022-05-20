/**
 * Name: user.model.js
 * Description:
 */

// Dependencies
const bcrypt = require('bcryptjs'); // bcrypt
const db = require('../database/database'); // database

// Create a class for user object
class User {
  // Declare constructor function
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }
  //   Declare signup method
  async singup() {
    // Encrupt password
    const hashedPassword = await bcrypt.hash(this.password, 12);

    // Connect to db and insert to db
    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
}

// export user model
module.exports = User;
