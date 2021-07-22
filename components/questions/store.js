
// Argumentos que RECIBO:
// Id comprador --> traer su carrito
// El carrito del usuario (extraido a partir del Id del comprador)
// Los productos que hay en el carrito
// Metodo de pago
// Direccion de envio
// RETORNO:
// 

const { Product, Questions, Seller, User } = require('../../db');
const store = require('../carts/store')
const { product_attributes} = require('../../aux_functions');

const createQuestion = async(params) => {

    const date = new Date();

    const product = await Product.findOne({
        where: {id: params.productId},
        include: [{model: Seller,
            attributes: ["id"]}]
    })
    const seller = await Seller.findOne({
        where: {id: product.seller.id}
    })
    const user = await User.findOne({
        where: {id: params.userId}
    })

    const new_question = await Questions.create({
        question: params.question,
        date : date
    })
    await new_question.setUser(user);
    await new_question.setSeller(seller);
    await new_question.setProduct(product); 
    
    return new_question;
}

const getAllUserQuestion = async (param) => {

    const questions = await Questions.findAll({
        where: {sellerId: param.sellerId},
    })

    return questions;
}

const getProductQuestions = async (param) => {

    const questions = await Questions.findAll({
        where: {productId: param.productId},
    })

    return questions;
}

const answerQuestion = async (param) => {
    const questions = await Questions.findOne({
        where: {id: param.questionId},
    })
    questions.response = param.response
    questions.save()
    return questions
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
	createQuestion,
    getAllUserQuestion,
    getProductQuestions,
    answerQuestion
}