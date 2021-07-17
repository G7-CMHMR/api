
// Argumentos que RECIBO:
// Id comprador --> traer su carrito
// El carrito del usuario (extraido a partir del Id del comprador)
// Los productos que hay en el carrito
// Metodo de pago
// Direccion de envio
// RETORNO:
// 

const { Purchase_order, Cart, Product, Items } = require('../../db');
const store = require('../carts/store')

const totalPrice = (cart) => {
    let total = 0;

    for (let i = 0; i < cart.length; i++){
        total += cart[i].amount*(cart[i].product.price - ((cart[i].product.price / 100) *cart[i].product.promotion.value))
    }

    return total;

}



const createOrder = async(data) => {
    const { userId, payment_method, userAddress } = data;
    const date = new Date();

    // const userCart = await store.getCart(userId);

    const userCart = await Cart.findOne({
        where: {userId: userId},
        include : [{model: Items}]
    })


    const total = totalPrice(userCart);
    const order = await Purchase_order.create({
        payment_method: payment_method, 
        address: userAddress, 
        status: 'created',
        total_price: total,
        date : date
    })
    await order.setUser(userId);


    userCart.items.map(async el => {
        await order.addItems(el)
        await userCart.removeItems(el)}
        )
    
    return order;

}

const getOrders = async (param) => {

    const purchaseOrders = await Purchase_order.findAll({
        where: {userId: param.userId}
    })

    return purchaseOrders;
}




const getOrderDetail = async (orderId) => {

    const purchaseOrder = await Purchase_order.findByPk(orderId.orderId)
    
    return purchaseOrder;
}

const changeOrderStatus = async(param) => {

    let purchase_order = await Purchase_order.findOne({
        where: {id: param.orderId}
    })

    switch(param.status){
        case 'processing':
            purchase_order.status = 'processing'
        break
        case 'canceled':
            purchase_order.status = 'canceled'
        break
        case 'expired':
            purchase_order.status = 'expired'
        break
        case 'complete':
            purchase_order.status = 'complete'
        break
    }

    await purchase_order.save();

    return `Se cambio el estado del producto a '${param.status}' exitosamente`;
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