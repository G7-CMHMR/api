const { DataTypes, UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchase_order', {
    // payment_method: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    payment_method: {
      type: DataTypes.ENUM,
      values: ['mercado-pago', 'credit-card'],
    },
    date: {
      type: DataTypes.DATE,
    },
    address: {
        type: DataTypes.STRING,
    },
    // status: {
    //     type: DataTypes.STRING,
    //     // ENUM: pending, expired, paid
    // },
    status: {
      type: DataTypes.ENUM,
      values: ['created', 'processing', 'canceled', 'expired','complete']
    },
    total_price: {
        type: DataTypes.FLOAT,
    }
  });
};


// Creada: cuando el comprador genera orden de compra al querer comprar todos los productos de su carrito
// Procesada: cuando se inicia el proceso de pago
// Cancelada cuando el pago sea rebotado
// Completada (lo cambia el estado el vendedor cuando despacha el producto)
