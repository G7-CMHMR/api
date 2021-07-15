const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/add', (req, res) => {
    controller
    .addCart(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo añadir el producto al carrito'))
})

router.post('/remove', (req, res) => {
    controller
    .removeCart(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo quitar el producto del carrito'))
})


router.get('/:userId', (req, res) => {
    controller
    .getCart(req.params.userId)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir los productos del carrito'))
})


module.exports = router;