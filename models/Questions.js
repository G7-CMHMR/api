const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('questions', {
    userName : {
      type: DataTypes.STRING,
      allowNull: false
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
      },
    response: {
        type: DataTypes.STRING,
      },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  });
};