const sql = require('mssql');
const { poolPromise } = require('../config/db');

// Función para obtener los socios
const getAllSocios = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT cedula, nombres FROM socios');
        return result.recordset;
    } catch (error) {
        console.error('Error obteniendo socios:', error);
        throw error;
    }
};

// Función para obtener socio por cédula
const getSocio = async (datosConsulta) => {
    try {
        const pool = await poolPromise;
        let result;

        const contieneNumeros = /\d/.test(datosConsulta);

        if (contieneNumeros) {
            result = await pool.request()
                .input('cedula', sql.VarChar, datosConsulta)
                .query('SELECT nombres, cedula, fuerza, edad, grado, foto, direccion, celular FROM socios WHERE cedula = @cedula');
            
            // común en desarrollo extraer el primer registro si esperamos solo uno
            return result.recordset.length > 0 ? result.recordset[0] : null;
        }
        else {
            result = await pool.request()
                .input('nombres', sql.VarChar, `%${datosConsulta}%`)
                .query('SELECT nombres, cedula, fuerza, edad, grado, foto, direccion, celular FROM socios WHERE nombres LIKE @nombres');
            return result.recordset;
        }

    } catch (error) {
        console.error('Error obteniendo el socio:', error);
        throw error;
    }
};

// Función para obtener socio por tarjeta
const getSocioByNumTarjeta = async (numTarjeta) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('numTarjeta', sql.VarChar, numTarjeta)
            .query('SELECT nombres, cedula, fuerza, edad, grado, foto, direccion, celular FROM socios WHERE num_tarjeta=@numTarjeta');
        return result.recordset[0];
    } catch (error) {
        console.error('Error al obtener socio por tarjeta:', error);
        throw error;
    };
};

module.exports = {
    getAllSocios,
    getSocio,
    getSocioByNumTarjeta
};


