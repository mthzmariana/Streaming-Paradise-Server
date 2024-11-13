const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('plataformadecontenido', 'root', 'Yaneli18062003', {
    host: 'localhost',
    dialect: 'mysql', // O el dialecto que estés utilizando
});

module.exports = sequelize;
