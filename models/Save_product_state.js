const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('save_product_state', {
    seller: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Usado', 'Nuevo', 'Reacondicionado']
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
    },
    prom_delivery: {
      type: DataTypes.STRING,
    },
    prom_value: {
      type: DataTypes.STRING,
    },
  });
};