
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
            include :[{model: User,
                attributes: ['name']
                // attributes: {exclude: ['createdAt','updatedAt']}
                }]
    })

    return questions;
}

const getProductQuestions = async (param) => {

    const questions = await Questions.findAll({
        where: {productId: param.productId},
        include :[{model: User,
            attributes: ['name']}]
    })

    return questions;
}

const updateResponse = async (param) => {
    const questions = await Questions.findOne({
        where: {id: param.questionId},
        include :[{model: User,
            attributes: ['name']}]
    })
    questions.response = param.response
    questions.save()
    return questions
}

const deleteQuestion = async (param) => {
    const questions = await Questions.findOne({
        where: {id: param.questionId},
        include :[{model: User,
            attributes: ['name']}]
    })
    await questions.destroy()
}


module.exports = {
	createQuestion,
    getAllUserQuestion,
    getProductQuestions,
    updateResponse,
    deleteQuestion
}