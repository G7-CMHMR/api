const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/', (req, res) => {
    console.log('ENTRO A ROUTER PRE_LOAD')
    controller
    .addPreLoad()
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir el producto'))
})

module.exports = router;