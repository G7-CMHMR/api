const { Router } =  require('express');
const router = Router();

const controller = require('./controller');
const response = require('../../network/response');

router.post('/create/:userId', (req, res) => {
	controller
		.createSeller(req.params.userId, req.body)
			.then( e => response.sucess(req, res, 200, e))
			.catch( e => response.error(req, res, 404, e, 'No se pudo crear vendedor'))
});

router.get('/:userId', (req, res) => {
	controller
		.getSeller(req.params.userId)
			.then(e => response.sucess(req, res, 200, e))
			.catch(e => response.error(req, res, 404, e, 'No se pudo obtener el vendedor'))
})

router.put('/update/:userId', (req, res) => {
	controller
		.updateSeller(req.params.userId, req.body)
			.then( e => response.sucess(req, res, 201, e))
			.catch( e => response.error(req, res, 401, e, 'No se pudo actualizar la informacion'))
});

module.exports = router;