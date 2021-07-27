const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/getUsers/', ( req, res ) => {
	controller.
		getUsers(req.params)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})

router.delete('/getUsers/', ( req, res ) => {
	controller.
		getUsers(req.params)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})


module.exports = router;