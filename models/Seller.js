const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('seller', {
    accountBank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    commission: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
  });
};