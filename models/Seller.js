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
    reputation: {
        type: DataTypes.FLOAT,
    },
    commission: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
  });
};