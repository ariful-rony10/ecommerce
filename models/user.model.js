const bcrypt = require('bcryptjs')
const db = require('../database/database')

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalcode: postal,
      city: city
    };
  }

 async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12) // encrypting password

    // Insert to db
    db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword, // ?
      name: this.name,
      address: this.address,
    });
  }

  // Get user || check if user email exists or not
  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email });
  }

  async userAlreadyExists() {
    const existingUser = await this.getUserWithSameEmail();
    if(existingUser) {
      return true;
    } 
    return false;
  }


  // Compare password 
  hasMatchingPassword(hashedPassword){
    return bcrypt.compare(this.password, hashedPassword);
  }

}

module.exports = User;