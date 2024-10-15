const express = require('express');
const router = express.Router();
const socioController = require('../controllers/socioController');

// Rutas para los usuarios

router.get('/socios', socioController.getAllSocios);

router.get('/socios/:datosConsulta', socioController.getSocio);

router.get('/socios/tarjeta/:numTarjeta', socioController.getSocioByNumTarjeta);




module.exports = router;