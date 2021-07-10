const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('seller', {
    account_bank: {
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
    commision: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
  });
};