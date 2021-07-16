
// Argumentos que RECIBO:
// Id comprador --> traer su carrito
// El carrito del usuario (extraido a partir del Id del comprador)
// Los productos que hay en el carrito
// Metodo de pago
// Direccion de envio
// RETORNO:
// 

const { Purchase_order, Cart } = require('../../db');

// const totalPrice = (cart) => {
//     for (let i = 0; i < cart.length; i++){
        
//     }

// }


const createOrder = async(data) => {
    // const { userId, payment_method, userAddress } = data;
    // const date = new Date();

    // const userCart = getCart(userId);

    // const order = Purchase_order.create({
    //     payment_method: payment_method, 
    //     address: userAddress, 
    //     status: 'created',

    // })
    // order.setUser(userId);
    // order.addProducts()

}

const getOrders = async (userId) => {
    const purchaseOrders = await Purchase_order.findAll({
        where: {userId: userId}
    })

    return purchaseOrders;
}




const getOrderDetail = async (orderId) => {
    const purchaseOrder = await Purchase_order.findByPk(orderId)

}

const changeOrderStatus = async(orderId) => {

}

module.exports = {
	createOrder,
	getOrders,
	getOrderDetail,
	changeOrderStatus
}

    // addCart: async function(params){

    //     const cart = await Cart.findOne({
    //         where: {userId: params.userId},
    //     })

    //     const product = await Product.findOne({
    //         where: {id: params.productId},
    //     })

    //     await cart.addProduct(product);

    //     return [cart,product]
    // },