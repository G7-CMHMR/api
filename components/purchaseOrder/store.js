
// Argumentos que RECIBO:
// Id comprador --> traer su carrito
// El carrito del usuario (extraido a partir del Id del comprador)
// Los productos que hay en el carrito
// Metodo de pago
// Direccion de envio
// RETORNO:
// 

const { Purchase_order, Cart } = require('../../db');

const totalPrice = (cart) => {
    let total = 0;

    for (let i = 0; i < cart.length; i++){
        total += cart[i].amount*(cart[i].product.price - ((cart[i].product.price / 100) *cart[i].product.promotion.value))
    }

    return total;

// }

cart --> [{amount, product(price, discount)}, {} ,...{}]
{
    amount: el.amount,
    product: el.dataValues.product
}


const createOrder = async(data) => {
    const { userId, payment_method, userAddress } = data;
    const date = new Date();

    const userCart = getCart(userId);


    const total = totalPrice(userCart);
    const order = Purchase_order.create({
        payment_method: payment_method, 
        address: userAddress, 
        status: 'created',
        total_price: total
    })
    order.setUser(userId);
    userCart.map( i => order.addProduct(i.product));

    console.log('ESTA ES LA ORDER: ',order);
    return order;

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