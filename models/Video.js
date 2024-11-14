const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const User = require('./User'); // Importa el modelo de Usuario

const Video = sequelize.define('Video', {
    idvideo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    views: {  // Campo para contar las visitas
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
    tableName: 'videos'
});

Video.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
module.exports = Video;
