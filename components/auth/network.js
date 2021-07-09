const { Router } =  require('express');
const router = Router();

// const auth = require('./middlewares/auth');
const { userValidator } = require('./middlewares/validations');
const validateFields = require('./middlewares/validate-fields');

const { create, login, update, updatePassword, googleSignIn } = require('./controller');


// "userValidator" es un middleware de express-validator que hace validaciones
// y va almacenando los errores que encuentre en la request

// "validateFields" es una funcion que llama a validationResults, 
// el cual es un middleware de express-validator que revisa
// si hubo algun error en las validaciones que se hicieron


router.post('/login', [userValidator.login, validateFields], login);

router.post('/create', [userValidator.create, validateFields], create);

// router.post('/update', [auth, userValidator.update, validateFields], update);

// router.post('/update-password', [auth, userValidator.updatePassword, validateFields], updatePassword)

router.post('/google', googleSignIn);


module.exports = router;