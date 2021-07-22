const { DataTypes, UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('seller', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false
    },
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
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuil: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
};