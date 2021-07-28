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
    valide: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    visible_lvl_2: {    //el producto se puede ver x más q el vendedor lo haya eliminado
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
    state: {      //este valor es el q se usa para hacer los save_product_state
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};