const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Items', {
    amount: {
      type: DataTypes.FLOAT,
      // allowNull: false,
      defaultValue: 0
    }
  });
};