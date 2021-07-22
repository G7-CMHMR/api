const { Router } =  require('express');
const router = Router();

const auth = require('./resources/middlewares/auth');
const { userValidator } = require('./resources/middlewares/validations');
const validateFields = require('./resources/middlewares/validate-fields');
const controller = require('./controller');
const response = require('../../network/response');

// const { create, login, update, updatePassword, googleSignIn, renewToken, confirmAccount } = require('./controller');


router.post('/login', [userValidator.login, validateFields], (req, res) => {
	controller
		.login(req.body)
		.then( e => response.sucess(req, res, 200, e))
		.catch( e => response.error(req, res, 404, e, 'No se pudo iniciar sesion'))
});

router.post('/create', [userValidator.create, validateFields], (req, res) => {
	controller
		.create(req.body)
		.then( e => response.sucess(req, res, 200, e))
		.catch( e => response.error(req, res, 404, e, 'No se pudo crear el usuario'))
});

router.put('/update', [auth, userValidator.update, validateFields], (req ,res) => {
	controller
		.update(req.id, req.body)
		.then( e => response.sucess(req, res, 201, e))
		.catch( e => response.error(req, res, 401, e, 'No se pudo actualizar la informacion'))
});

router.put('/update-password', [auth, userValidator.updatePassword, validateFields], (req, res) => {
	controller		
		.updatePassword(req.id, req.body)
		.then( e => response.sucess(req, res, 201, e))
		.catch( e => response.error(req, res, 401, e, 'No se pudo actualizar la informacion'))
});

router.get('/renew-token', auth, (req, res) => {
	controller
		.renewToken(req.id)
		.then( e => response.sucess(req, res, 201, e))
		.catch( e => response.error(req, res, 401, e, 'No se encuentra logueado el usuario'))
});

router.post('/google', (req, res) => {
	controller
		.googleSignIn(req.body.id_token)
		.then( e => response.sucess(req, res, 201, e))
		.catch( e => response.error(req, res, 401, e, 'No se pudo iniciar con google'))
});

router.get('/confirm-account/:emailToken', (req, res) => {
	controller
		.confirmAccount(req.params.emailToken)
		.then( e => response.sucess(req, res, 200, e))
		.catch( e => response.error(req, res, 401, e, 'No se pudo confirmar la cuenta'))
});


module.exports = router;