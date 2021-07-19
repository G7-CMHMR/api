const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
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
    valuation: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Visible_lvl_2: {    //el producto se puede ver x más q el vendedor lo haya eliminado
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    warranty: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};