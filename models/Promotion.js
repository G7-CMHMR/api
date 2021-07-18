const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('promotion', {
    title: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.FLOAT,
    },
    // image: {
    //     type: DataTypes.STRING,  //ahora no tiene imagen
    //     isUrl: true,
    // },
    delivery: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
  });
};