const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('seller_sells', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_buyer: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    buyer: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    product_status: {
        type: DataTypes.ENUM,
        values: ['created', 'processing', 'canceled', 'expired','complete'],
        allowNull: false
      },
    address: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    productId: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
  });
};