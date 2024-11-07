// models/Charts.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Asegúrate de tener una configuración para la conexión

const Charts = sequelize.define('Charts', {
    // Solo se usa para la consulta, por lo tanto no requiere definición de atributos específicos
}, {
    tableName: 'users', // Nombre de la tabla en la base de datos
    timestamps: false // Desactivar timestamps si no están en la tabla
});

module.exports = Charts;
