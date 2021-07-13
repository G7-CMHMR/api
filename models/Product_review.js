const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('product_review', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valoration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    dislikes: {
      type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
  });
};