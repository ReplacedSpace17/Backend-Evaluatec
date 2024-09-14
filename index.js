// app.js
const express = require('express');
const app = express();
const configureSessions = require('./tools/Sessions'); // Ajusta la ruta según la ubicación del archivo

app.use(express.json());
configureSessions(app);

// Importar el archivo de rutas
const routes_register = require('./Modules/Register/register');
const routes_login = require('./Modules/Login/login');

// Usar las rutas importadas para register
app.use('/register', routes_register);
app.use('/login', routes_login);

// Definir el puerto
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
