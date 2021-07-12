const bcrypt = require('bcryptjs');

const { User } = require('../../db');

const hashPassword = require('./resources/utils/hashPassword');
const { generateJWT } = require('./resources/utils/jwt');
const { googleVerify } = require('./resources/utils/googleVerify')


const login = async (user) => {

    const userRegistered = await User.findOne({ where: { email: user.email } });
    if (!userRegistered)  throw { error:'El usuario no se encuentra registrado' };

    const isValidPassword = bcrypt.compareSync(user.password, userRegistered.password);
    if (!isValidPassword) throw { error: 'El password es incorrecto' };

    // En este punto, el usuario existe e ingreso correctamente el password
    const { id, name, lastName, email } = userRegistered;

    // Genera un token 
    const token = await generateJWT(id, name);

    // Envía como respuesta el usuario junto al token
    return {
        id,
        name,
        token
    };

}


const create = async (user) => {

    try {
        const userRegisteredWithMail = await User.findOne({ where: { email: user.email } });
        if (userRegisteredWithMail !== null)   throw { error: 'Este email ya está en uso' };

        user.password = await hashPassword(user.password);

        const newUser = await User.create(user);

        const isNewUserCreated = Object.keys(newUser).length > 0;
        if (isNewUserCreated)   return { succesfull: 'El usuario se ha creado con exito' };

    // Atrapa en caso de haber algun error
    } catch (error) {
        throw error;
    }
}


const update = async (req, res) => {

    const userId = req.id;
    const dataUpdate = req.body;

    try {
        const user = await User.findByPk(userId, { attributes: { exclude: ["password"] } });

        if (!user) return res.status(400).json({ ok: false, msg: 'Usuario no encontrado' });

        user.name = dataUpdate.name;
        user.lastName = dataUpdate.lastName;
        user.email = dataUpdate.email;

        user.save();

        return res.json({
            ok: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }

}


const updatePassword = async (req, res) => {

    const userId = req.id;

    const { oldPassword, newPassword, newPasswordConfirm } = req.body;

    const user = await User.findByPk(userId);


    if (!user) return res.status(401).json({ ok: false, msg: 'No se encuentra el usuario' });

    if (!(await bcrypt.compare(oldPassword, user.password))) return res.status(400).json({
        ok: false, msg: 'La contraseña actual no es correcta'
    })

    if (newPassword !== newPasswordConfirm) return res.json({
        ok: false,
        msg: 'Las constraseñas no coinciden'
    })

    const passwordHashed = await hashPassword(newPassword);

    await user.update(
        { password: passwordHashed }
    )

    return res.json({
        ok: true,
        msg: 'Contraseña actualizada'
    })

};


const renewToken = async (req, res) => {

    const {id, name} = req;

    const token = await generateJWT(id, name);

    return res.json({
        ok: true,
        id,
        name,
        token
    })
    
};


const googleSignIn = async (req, res) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token);

        const { name, email } = googleUser;

        let user = await User.findOne({ where: { email } });

        // TODO: ver como manejar el password cuando es de google
        ///////////////////////////////////////////////////////////
        if (!user) {  
            const data = {
                name: name.split(" ")[0],
                lastName: name.split(" ")[1] || ' ',
                email,
                password: '',
            }
            user = await User.create(data);
        }

        const token = await generateJWT(user.id, user.name);

        return res.json({
            ok: true,
            name: user.name,
            token
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'El token de Google no es válido',
            error
        })
    }


};


module.exports = {
    create,
    login,
    update,
    updatePassword,
    renewToken,
    googleSignIn
}

