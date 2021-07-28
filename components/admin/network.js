const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/Users/', ( req, res ) => {
	controller.
		getUsers(req.query)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})

router.put('/Pass/', ( req, res ) => {
	controller.
		changePass(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})

router.put('/giveMeAReview/', ( req, res ) => {
	controller.
		makeReview(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})

router.post('/MakeMeUser/', ( req, res ) => {
	controller.
		becomeUser(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})

router.get('/notValidePC/', ( req, res ) => {
	controller.
		getAllPC()
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})

router.delete('/User/', ( req, res ) => {
	controller.
		delUser(req.body)
	    .then(e => response.sucess(req, res, 200, e))
    	.catch(e => response.error(req, res, 404, e, 'Fallo al crear la orden de compra'))
})


module.exports = router;