const express = require('express');
const cors = require('cors'); // Importar cors
const app = express();
const configureSessions = require('./tools/Sessions'); // Ajusta la ruta según la ubicación del archivo

app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las rutas
configureSessions(app);

// Importar el archivo de rutas
const routes_register = require('./Modules/Register/register');
const routes_login = require('./Modules/Login/login');
const routes_home = require('./Modules/Home/home');
const routes_docente = require('./Modules/Docente/docente');

// ----------------------------------- Routes -----------------------------------
app.use('/register', routes_register);
app.use('/login', routes_login);
app.use('/home', routes_home);
app.use('/docente', routes_docente);

// Definir el puerto
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
