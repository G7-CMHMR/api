const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/', (req, res) => {
    controller
    .getAllCategory()
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en conseguir las categorias'))
})
router.post('/category', (req, res) => {
    controller
    .postCategory(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en crear una categoria'))
})
router.post('/type', (req, res) => {
    controller
    .postType(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en crear un type'))
})
router.post('/edit', (req, res) => {
    controller
    .editCategory(req.body)
    .then(e => response.sucess(req, res, 200, e))
    .catch(e => response.error(req, res, 404, e,'fallo en editar una categoría'))
})
module.exports = router;