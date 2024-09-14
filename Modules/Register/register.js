// Modules/Register/register.js
const express = require('express');
const router = express.Router();
const { 
    helloWorld, validate_email, create_new_account
} = require('./FunctionsRegister');

// -----------------------------------  Ruta principal de '/Register'
router.get('/', (req, res) => {
    res.send('Raiz de Register');
});

//Registro de usuario
router.post('/create-account', (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    //validar que no exista el correo en la base de datos
    console.log('\n✉️ - Verificando el correo:', email);
    validate_email(email, async (exists) => {
        if (exists) {
            console.log('El correo ya existe');
            res.status(400).json({
                message: 'El correo ingresado ya existe'
            });
        } else {
            console.log('El correo no existe');
            // Crear nueva cuenta
             await create_new_account(req, res, email, password);
        }
    });
});



module.exports = router;
