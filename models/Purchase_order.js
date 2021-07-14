const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchase_order', {
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
    address: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    total_price: {
        type: DataTypes.FLOAT,
    }
  });
};