const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const {product_attributes} = require('../../aux_functions');

const router = express.Router();

router.get('/:product_id', (req, res) => {
    controller
    .getProduct(req.params.product_id)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir el producto'))
})
router.post('/', (req, res) => {
    controller
    .addProduct(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir el producto'))
})
router.post('/update/:product_id', (req, res) => {
    controller
    .updateProduct(req.params.product_id, req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,`fallo en hacer update el producto, esta URL solo acepta ${product_attributes}`))
})

module.exports = router;