const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '', {

    host: 'localhost',
    dialect: 'mysql', // O el dialecto que estés utilizando
});

module.exports = sequelize;
