
// Argumentos que RECIBO:
// Id comprador --> traer su carrito
// El carrito del usuario (extraido a partir del Id del comprador)
// Los productos que hay en el carrito
// Metodo de pago
// Direccion de envio
// RETORNO:
// 

const { Purchase_order, Cart, Product,Save_product_state, Items, Promotion, Category, Image, Seller, User, Seller_sells } = require('../../db');
const store = require('../carts/store')
const { product_attributes} = require('../../aux_functions');
const { response } = require('express');

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
        //status: 'created',
        total_price: total,
        date : date,
        paid_out : false
    })
    await order.setUser(userId);


    userCart.items.map(async el => {
        await order.addItems(el)
        // await userCart.removeItems(el)
    })
    setTimeout(async function(){
        if(order.paid_out !== true){

            const dsa = await Purchase_order.findOne({
                where: {id: order.id},
                attributes : ['id'],
                include : [{model: Items}]
            })
            dsa.items.map(async (e)=>{
                const asd = await Product.findOne({
                    where:{id : e.productId}
                })
                asd.stock += e.amount
                await asd.save()
                })
            }
    }, 60000);
        // return order

}

const getOrders = async (param) => {

    const purchaseOrders = await Purchase_order.findAll({
        where: {userId: param.userId},
            include : [{
                model: Items,
                include:[{
                    model: Product, 
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
                },{
                    model:Save_product_state,
                    attributes: {exclude: ['createdAt','updatedAt']},
						include: [
							{
								model:Category,
								attributes: ["title"],
							},
						]
                }]}]
    })

    return purchaseOrders;
}




const getOrderDetail = async (orderId) => {

    const purchaseOrder = await Purchase_order.findOne({
        where: {id: orderId.orderId},
            include : [{model: Items,
                include:
                [{model: Product, 
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
                },{
                    model:Save_product_state,
                    attributes: {exclude: ['createdAt','updatedAt']},
						include: [
							{
								model:Category,
								attributes: ["title"],
							},
						]
                }]}]
    })
    
    
    return purchaseOrder;
}

const getItemsFromUser = async(data) =>{
    let response = [];
    const user = await User.findOne({
        where:{id : data.userId},
        include:[{model:Purchase_order,
            where:{paid_out : true},
            include:[{model:Items,
                attributes: {exclude: ['createdAt','updatedAt']},
                include:[{model:Product,
                    attributes: {exclude: ['createdAt','updatedAt']},
                    include:[{model:Promotion},{model:Image},{model:Category}]},
                {model:Purchase_order,
                    attributes: {exclude: ['createdAt','updatedAt']},},
                {model:Seller_sells,
                    attributes:['product_status']},
                {model:Save_product_state}
            ]
        }]}]
    })
    user.purchase_orders.map(PurchaseO=>{
        PurchaseO.items.map(item=>{
            response.push(item)
        })
    })
    return response
}

const changeOrder = async(data) =>{
    order = await Purchase_order.findOne({
        where: {mercadopagoId : data.mercadopagoId}
    })
    order.paid_out = true
    await order.save()
    let id = {userId : data.userId}
    return await getItemsFromUser(id)
}

// const changeOrderStatus = async(param) => {

//     let purchase_order = await Purchase_order.findOne({
//         where: {id: param.orderId},
//             include : [{model: Items,include:
//                 {model: Product, 
//                     attributes: product_attributes,
//                     include: [
//                         {
//                             model: Seller,
//                             attributes: ["id"],
//                             include: [{
//                                 model: User,
//                                  attributes: ["name"],
//                             }]
//                         },
//                         {
//                             model:Image,
//                             attributes: ["image"],
//                         },
//                         {
//                             model:Category,
//                             attributes: ["title"],
//                         },
//                         {
//                             model:Promotion,
//                             attributes: ["value","delivery"],
//                         }
//                     ],    
//                 }}]
//     })

//     switch(param.status){
//         case 'processing':
//             purchase_order.status = 'processing'
//         break
//         case 'canceled':
//             purchase_order.status = 'canceled'
//         break
//         case 'expired':
//             purchase_order.status = 'expired'
//         break
//         case 'complete':
//             purchase_order.status = 'complete'
//         break
//     }

//     await purchase_order.save();

//     return purchase_order;
// }

module.exports = {
	createOrder,
	getOrders,
	getOrderDetail,
    changeOrder,
    getItemsFromUser
	//changeOrderStatus
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