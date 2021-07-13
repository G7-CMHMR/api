const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('product_review', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valoration: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
    },
    likes: {
        type: DataTypes.NUMBER,
    },
    dislikes: {
      type: DataTypes.NUMBER,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
  });
};