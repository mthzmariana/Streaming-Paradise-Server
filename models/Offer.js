const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Subscription = require('./Subscription'); 

const Offer = sequelize.define('Offer', {
  idoffer: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  porcentaje: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  idsub: {
    type: DataTypes.INTEGER,
    references: {
      model: 'subscriptions', 
      key: 'idsub',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'offers',
});

// Definir la relación
Offer.belongsTo(Subscription, { foreignKey: 'idsub', targetKey: 'idsub' });

module.exports = Offer;
