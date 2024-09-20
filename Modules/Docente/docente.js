// Modules/Register/register.js
const express = require('express');
const router = express.Router();
const { 
    get_info_professor
} = require('./FunctionsDocente');

// -----------------------------------  Ruta principal de '/Register'
router.get('/', (req, res) => {
    res.send('Raiz de docente');
});

//get resume of the professor
router.get('/get_information/:id', (req, res) => {
    const id_docente = req.params.id;
    console.log('Obteniendo información del profesor con ID:', id_docente);
    get_info_professor(req, res, id_docente);
});




module.exports = router;
