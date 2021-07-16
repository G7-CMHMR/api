
// Argumentos que RECIBO:
// Id comprador --> traer su carrito
// El carrito del usuario (extraido a partir del Id del comprador)
// Los productos que hay en el carrito
// Metodo de pago
// Direccion de envio
// RETORNO:
// 

const { Purchase_order, Cart, Product } = require('../../db');
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

    const userCart = await store.getCart(userId);


    const total = totalPrice(userCart);
    const order = await Purchase_order.create({
        payment_method: payment_method, 
        address: userAddress, 
        status: 'created',
        total_price: total,
        date : date
    })
    order.setUser(userId);
    // console.log(userCart[0].product)
    // userCart.map( i =>
    //     // console.log(i.product)

    //     order.addProduct(i.product)
    //     );

    // console.log('ESTA ES LA ORDER: ',order);
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