const { DataTypes, UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchase_order', {
    payment_method: {
      type: DataTypes.ENUM,
      values: ['mercado-pago', 'credit-card'],
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    mercadopagoId: {
        type: DataTypes.STRING,
    }
  });
};


// Creada: cuando el comprador genera orden de compra al querer comprar todos los productos de su carrito
// Procesada: cuando se inicia el proceso de pago
// Cancelada cuando el pago sea rebotado
// Completada (lo cambia el estado el vendedor cuando despacha el producto)
