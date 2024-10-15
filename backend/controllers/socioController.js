// Este archivo contiene la lógica para manejar las solicitudes con los usuarios

const socioModel = require('../models/socioModel');

// Función para obtener todos los usuarios

exports.getAllSocios = async (req, res) => {
    try {
        const socios = await socioModel.getAllSocios();
        res.json(socios);
    } catch (error) {
        res.status(500).send('Error obteniendo los socios');
    }
};

// Función para obtener un usuario por ID
exports.getSocio = async (req, res) => {
    const datosConsulta = req.params.datosConsulta;
    try {
      const socio = await socioModel.getSocio(datosConsulta);
      if (socio) {
        res.json(socio);
      } else {
        res.status(404).send('Socio no existe en la base de datos');
      }
    } catch (error) {
      res.status(500).send('Error obteniendo el socio');
    }
  };

  exports.getSocioByNumTarjeta = async(req, res) => {
    const numTarjeta = req.params.numTarjeta;
    try {
        const socio = await socioModel.getSocioByNumTarjeta(numTarjeta);
        if (socio) {
            res.json(socio);
        } else {
            res.status(404).send('Socio no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error obteniendo el socio');
    }
  };