
// Argumentos que RECIBO:
// Id comprador --> traer su carrito
// El carrito del usuario (extraido a partir del Id del comprador)
// Los productos que hay en el carrito
// Metodo de pago
// Direccion de envio
// RETORNO:
// 

const { Purchase_order, Cart, Product, Items, Promotion, Category, Image, Seller, User } = require('../../db');
const store = require('../carts/store')
const { product_attributes} = require('../../aux_functions');

const totalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++){
        total += cart[i].amount*(cart[i].product.price - ((cart[i].product.price / 100) *cart[i].product.promotion.value))
    }

    return total;

}



const createOrder = async(data) => {
    const { userId, payment_method, userAddress, id } = data;
    const date = new Date();

    // const userCart = await store.getCart(userId);

    const userCart = await Cart.findOne({
        where: {userId: userId},
        include : [{model: Items,include:{model: Product, include:{model:Promotion}}}]
    })


    const total = totalPrice(userCart.items);
    const order = await Purchase_order.create({
        mercadopagoId: id,
        payment_method: payment_method, 
        address: userAddress, 
        status: 'created',
        total_price: total,
        date : date
    })
    await order.setUser(userId);


    userCart.items.map(async el => {
        await order.addItems(el)
        // await userCart.removeItems(el)
    }
        )
    
    return order;

}

const getOrders = async (param) => {

    const purchaseOrders = await Purchase_order.findAll({
        where: {userId: param.userId},
            include : [{model: Items,include:
                {model: Product, 
                    attributes: product_attributes,
                    include: [
                        {
                            model: Seller,
                            attributes: ["id"],
                            include: [{
                                model: User,
                                 attributes: ["name"],
                            }]
                        },
                        {
                            model:Image,
                            attributes: ["image"],
                        },
                        {
                            model:Category,
                            attributes: ["title"],
                        },
                        {
                            model:Promotion,
                            attributes: ["value","delivery"],
                        }
                    ],    
                }}]
    })

    return purchaseOrders;
}




const getOrderDetail = async (orderId) => {

    const purchaseOrder = await Purchase_order.findOne({
        where: {id: orderId.orderId},
            include : [{model: Items,include:
                {model: Product, 
                    attributes: product_attributes,
                    include: [
                        {
                            model: Seller,
                            attributes: ["id"],
                            include: [{
                                model: User,
                                 attributes: ["name"],
                            }]
                        },
                        {
                            model:Image,
                            attributes: ["image"],
                        },
                        {
                            model:Category,
                            attributes: ["title"],
                        },
                        {
                            model:Promotion,
                            attributes: ["value","delivery"],
                        }
                    ],    
                }}]
    })
    
    
    return purchaseOrder;
}

const changeOrderStatus = async(param) => {

    let purchase_order = await Purchase_order.findOne({
        where: {id: param.orderId},
            include : [{model: Items,include:
                {model: Product, 
                    attributes: product_attributes,
                    include: [
                        {
                            model: Seller,
                            attributes: ["id"],
                            include: [{
                                model: User,
                                 attributes: ["name"],
                            }]
                        },
                        {
                            model:Image,
                            attributes: ["image"],
                        },
                        {
                            model:Category,
                            attributes: ["title"],
                        },
                        {
                            model:Promotion,
                            attributes: ["value","delivery"],
                        }
                    ],    
                }}]
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

    return purchase_order;
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