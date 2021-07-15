const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/add', (req, res) => {
    controller
    .addFavourite(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo añadir el producto a favoritos'))
})

router.post('/remove', (req, res) => {
    controller
    .removeFavourite(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo quitar el producto de favoritos'))
})


router.get('/:userId', (req, res) => {
    controller
    .getFavourites(req.params.userId)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir los productos favoritos'))
})


module.exports = router;