const { encrypt_password, compare_password } = require('../../tools/bycrypt'); 
const connection = require('../../config/SQL_Connector'); 


// Function to validate that the user does not exist in the database
function validate_email(email, callback) {
  const query = 'SELECT COUNT(*) AS count FROM Alumno WHERE Email = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(false); // O maneja el error de otra manera
    }
    
    const count = results[0].count;
    // Return true if count > 0 (email exists), false otherwise
    callback(count > 0);
  });
}

// Function to insert the user into the database
async function create_new_account(req, res, email, password) {
  try {
    // Encrypt the password
    const hashedPassword = await encrypt_password(password);
    console.log('Encrypted Password:', hashedPassword);

    // Define the query to insert the new user, including the Confirm column
    const query = 'INSERT INTO Alumno (Email, Password, Confirm) VALUES (?, ?, ?)';

    // Set default value for Confirm column
    const confirm = false; // or set to true if needed

    // Execute the query
    connection.query(query, [email, hashedPassword, confirm], (err, results) => {
      if (err) {
        console.error('Error inserting user into the database:', err);
        // Send a response to the client with an error message
        return res.status(500).send('Error inserting user into the database');
      }
      
      console.log('User inserted successfully:');
      // Send a success message to the client
      res.send('User created successfully with encrypted password');
    });
  } catch (err) {
    console.error('Error encrypting password:', err);
    // Send a response to the client with an error message
    res.status(500).send('Error encrypting password');
  }
}

//Function to send a email to user
function send_email_confirmation(email ) {

}

function helloWorld() {
  console.log('Hello World!');
}

module.exports = { helloWorld, validate_email, create_new_account };
