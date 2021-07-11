const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/category/:category_name', (req, res) => {
    controller
    .getAllProductsByCategory(req.params.category_name)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir los productos por categoria'))
})
router.get('/', (req, res) => {
    controller
    .getAllProducts()
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir los productos'))
})

router.get('/offer', (req, res) => {
    controller
    .getAllProductsOffer()
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir los productos en oferta'))
})

module.exports = router;