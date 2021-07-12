const { Router } =  require('express');
const router = Router();

const auth = require('./resources/middlewares/auth');
const { userValidator } = require('./resources/middlewares/validations');
const validateFields = require('./resources/middlewares/validate-fields');
const response = require('../../network/response');

const { create, login, update, updatePassword, googleSignIn, renewToken } = require('./controller');


// "userValidator" es un middleware de express-validator que hace validaciones
// y va almacenando los errores que encuentre en la request

// "validateFields" es una funcion que llama a validationResults, 
// el cual es un middleware de express-validator que revisa
// si hubo algun error en las validaciones que se hicieron


// router.post('/login', [userValidator.login, validateFields], login);
router.post('/login', [userValidator.login, validateFields], (req, res) => {
	// controller.
		login(req.body)
		.then( e => {
			response.sucess(req, res, 200, e);
		})
		.catch( e => {
			response.error(req, res, 404, e, 'No se pudo iniciar sesion');
		})
});



// router.post('/create', [userValidator.create, validateFields], create);
router.post('/create', [userValidator.create, validateFields], (req, res) => {
		create(req.body)
		.then( e => {
			response.sucess(req, res, 200, e)
		})
		.catch( e => {
			response.error(req, res, 404, e, 'No se pudo crear el usuario');
		})
});

router.post('/update', [auth, userValidator.update, validateFields], update);

router.post('/update-password', [auth, userValidator.updatePassword, validateFields], updatePassword);

router.get('/renew-token', auth, renewToken);

router.post('/google', googleSignIn);


module.exports = router;