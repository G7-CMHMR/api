const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/', ( req, res ) => {
	controller.
		getItems(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener los items'))
})

router.get('/all', ( req, res ) => {
	controller.
		getSellerItems(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener los items del vendedor'))
})

router.get('/filter', ( req, res ) => {
	controller.
		getSellerItemsFilter(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al obtener los items del vendedor'))
})

router.put('/status', (req, res) => {
	controller.
		changeItemStatus(req.body)
		.then(e => response.sucess(req, res, 200, e))
		.catch(e => response.error(req, res, 404, e, 'Fallo al intentar cambiar el estado del item'));
})

module.exports = router;