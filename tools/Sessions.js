// Sessions.js

const session = require('express-session');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configurar Sequelize para la conexión a la base de datos
const sequelize = new Sequelize('EVALUATEC', 'API_User', 'VJQy9lCOUWsB3wZ', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,  // Desactiva el logging SQL para menos ruido en la consola
});

// Configurar el almacén de sesiones usando Sequelize
const sessionStore = new SequelizeStore({
    db: sequelize,
});

// Sincronizar el almacén de sesiones con la base de datos
sessionStore.sync()
    .then(() => {
        console.log('Session store synchronized with the database.');
    })
    .catch(err => {
        console.error('Error syncing session store:', err);
    });

// Exportar la configuración del middleware de sesiones
module.exports = (app) => {
    app.use(session({
        secret: 'OIw9d4lRo32O5idR7PE446',   // Cambia esta clave por una clave secreta y única
        resave: false,               // No guarda la sesión si no ha cambiado
        saveUninitialized: false,    // No guarda sesiones no inicializadas
        store: sessionStore,         // Usar el almacén de sesiones configurado
        cookie: { secure: false }    // Cambia a `true` si usas HTTPS
    }));
};
