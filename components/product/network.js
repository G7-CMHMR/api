const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/', (req, res) => {
    controller
    .getProduct(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir el producto'))
})

module.exports = router;