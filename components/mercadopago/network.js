const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/', (req, res) => {
    console.log('Entro al network')
    controller
    .createPreference(req.body)

    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en ir al checkout'))
})


module.exports = router;