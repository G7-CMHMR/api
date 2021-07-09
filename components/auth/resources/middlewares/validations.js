const { check } = require('express-validator');


const userValidator = {
    create: [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('name', 'El nombre debe tener entre 2 y 15 caracteres').isLength({ min: 2, max: 15 }),
        check('lastName', 'El apellido es obligatorio').notEmpty(),
        check('lastName', 'El apellido debe tener entre 2 y 15 caracteres').isLength({ min: 2, max: 15 }),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener entre 8 y 20 caracteres').isLength({ min: 8, max: 20 }),
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'El mail debe tener un formato válido').isEmail()
    ],
    login: [
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'El email debe tener un formato válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener entre 8 y 20 caracteres').isLength({min: 8, max: 20}),
    ],
    update: [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('name', 'El nombre debe tener entre 2 y 15 caracteres').isLength({ min: 2, max: 15 }),
        check('lastName', 'El apellido es obligatorio').notEmpty(),
        check('lastName', 'El apellido debe tener entre 2 y 15 caracteres').isLength({ min: 2, max: 15 }),
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'El mail debe tener un formato válido').isEmail()
    ],
    updatePassword: [
        check('oldPassword', 'La contraseña actual es obligatoria').notEmpty(),
        check('oldPassword', 'La contraseña actual debe tener entre 8 y 20 caracteres').isLength({min: 8, max: 20}),
        check('newPassword', 'La nueva contraseña es obligatoria').notEmpty(),
        check('newPassword', 'La nueva contraseña debe tener entre 8 y 20 caracteres').isLength({min: 8, max: 20}),
        check('newPasswordConfirm', 'La contraseña de confirmación es obligatoria').notEmpty(),
        check('newPasswordConfirm', 'La contraseña de confirmación debe tener entre 8 y 20 caracteres').isLength({min: 8, max: 20}),
    ],
}


module.exports = {
    userValidator
};