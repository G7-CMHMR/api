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

router.post('/seller', ( req, res ) => {
	controller.
		getAllSellerQuestion(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener las preguntas del vendedor'))
})

router.post('/product', ( req, res ) => {
	controller.
		getProductQuestions(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener las preguntas del producto'))
})

router.put('/response', (req, res) => {
	controller.
		updateResponse(req.body)
		.then(e => response.sucess(req, res, 200, e))
		.catch(e => response.error(req, res, 404, e, 'Fallo al intentar responder 😞'));
})

router.post('/', (req, res) => {
	controller.
		deleteQuestion(req.body)
		.then(e => response.sucess(req, res, 200, e))
		.catch(e => response.error(req, res, 404, e, 'Fallo al intentar borrar 😞'));
})

router.post('/answerMe', (req, res) => {
	controller.
		answerMe(req.body)
		.then(e => response.sucess(req, res, 200, e))
		.catch(e => response.error(req, res, 404, e, 'Fallo al intentar borrar 😞'));
})


module.exports = router;