const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('plataformadecontenido', 'cetz', 'cetz', {
    host: 'localhost',
    dialect: 'mysql', // O el dialecto que estés utilizando
});

module.exports = sequelize;
