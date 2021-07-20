const { Router } = require('express');
const router = Router();

const controller = require('./controller');
const response = require('../../network/response');

router.post('/create', (req, res) => {
	controller
		.createSellerReview(req.body)
			.then(e => response.sucess(req, res, 200, e))
			.chatch(e => response.error(req, res, 400, e, 'Fallo al crear la review'))
});

router.get('/:idSeller', (req, res) => {
	controller
		.getSellerReviews(req.params.id)
			.then(e => response.sucess(req, res, 200, e))
			.catch(e => response.error(req, res, 404, e, 'Fallo al obtener la review'))
});

router.put('/:idSellerReview', (req, res) => {
	controller
		.updateSellerReview(req.params.id)
			.then(e => response.sucess(req, res, 201, e))
			.catch(e => response.error(req, res, 401, e, 'Fallo al modificar la review'))
})

router.delete('/:idSellerReview', (req, res) => {
	controller
		.deleteSellerReview(req.body)
			.then(e => response.sucess(req, res, 200, e))
			.catch(e => response.error(req, res, 404, e, 'Fallo al remover la review'))
});

module.exports = router;