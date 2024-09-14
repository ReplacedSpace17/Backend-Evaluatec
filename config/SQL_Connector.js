const mysql = require('mysql2');


const connection = mysql.createPool({
  host: 'localhost',
  user: 'API_User',
  password: 'VJQy9lCOUWsB3wZ',
  database: 'EVALUATEC',
  port: 3306
});


// Verificar la conexión
connection.getConnection((err, conn) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
    console.log('\n---------------------💻 Evaluatec running API 💻---------------');
    conn.release(); // Liberar la conexión cuando no se necesita
  }
});

module.exports = connection;
