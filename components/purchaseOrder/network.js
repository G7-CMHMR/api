const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/create', ( req, res ) => {
	controller.
		createOrder(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})

router.get('/', ( req, res ) => {
	controller.
		getOrders(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener las ordenes de compra'))
})

router.get('/:orderId', ( req, res ) => {
	controller.
		getOrderDetail(req.params)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener las ordenes de compra'))
})

router.put('/status', (req, res) => {
	controller.
		changeOrderStatus(req.body)
		.then(e => response.sucess(req, res, 200, e))
		.catch(e => response.error(req, res, 404, e, 'Fallo al intentar cambiar el estado de la orden de compra'));
})

module.exports = router;