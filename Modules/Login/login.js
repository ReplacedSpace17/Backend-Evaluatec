// Modules/Register/register.js
const express = require('express');
const router = express.Router();
const { login_user } = require('./FunctionsLogin');
// -----------------------------------  Ruta principal de '/Register'
router.get('/', (req, res) => {
    res.send('Raiz de Login');
});

//Registro de usuario
router.post('/validate-user', (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    console.log('\n🧑‍🦱 - Iniciando sesion para:', email);
    login_user(req, res, email, password);
});

// Example of a protected route
router.get('/protected', (req, res) => {
    if (req.session.user) {
        res.send(`Hola, ${req.session.user.email}!`);
    } else {
        res.status(401).send('No estás autenticado');
    }
});


module.exports = router;
