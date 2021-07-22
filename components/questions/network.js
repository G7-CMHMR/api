const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/create', ( req, res ) => {
	controller.
		createQuestion(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la pregunta'))
})

router.get('/user', ( req, res ) => {
	controller.
		getAllUserQuestion(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener las preguntas del vendedor'))
})

router.get('/product', ( req, res ) => {
	controller.
		getProductQuestions(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener las preguntas del producto'))
})

// router.put('/status', (req, res) => {
// 	controller.
// 		changeOrderStatus(req.body)
// 		.then(e => response.sucess(req, res, 200, e))
// 		.catch(e => response.error(req, res, 404, e, 'Fallo al intentar cambiar el estado de la orden de compra'));
// })

module.exports = router;