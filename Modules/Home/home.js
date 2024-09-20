// Modules/Register/register.js
const express = require('express');
const router = express.Router();
const { 
   get_all_professors, get_last_professors_evaluated, get_last_scores
} = require('./FunctionsHome');

// -----------------------------------  Ruta principal de '/Register'
router.get('/', (req, res) => {
    res.send('Raiz de home');
});

//Get all professors
router.get('/get_All_Professors', (req, res) => {
    get_all_professors(req, res);
});

//Get last 5 professors evaluated
router.get('/get_Last_Professors_Evaluated', (req, res) => {
    get_last_professors_evaluated(req, res);
});

//Get last 30 scores
router.get('/get_Last_Scores', (req, res) => {
    get_last_scores(req, res);
});



module.exports = router;
