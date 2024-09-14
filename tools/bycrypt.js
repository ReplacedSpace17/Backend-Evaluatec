const bcrypt = require('bcrypt');
const saltRounds = 10; // Define the number of salt rounds

// Function to encrypt the password
function encrypt_password(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
}

// Function to compare the password with the hash
function compare_password(password, hash, callback) {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result); // result will be true if passwords match, false otherwise
  });
}

module.exports = {
  encrypt_password,
  compare_password
};
