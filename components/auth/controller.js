const bcrypt = require('bcryptjs');

const { User } = require('../../db');

const hashPassword = require('./resources/utils/hashPassword');
const { generateJWT } = require('./resources/utils/jwt');
const { googleVerify } = require('./resources/utils/googleVerify')


const login = async (user) => {

    // Con el email pasado por parametro, busca el usuario en la bd
    const searchedUser = await User.findOne({ where: { email: user.email } });
    
    // En caso que el usuario no se encuentre registrado
    if (!searchedUser) {
        return {
            ok: false,
            msg: 'El usuario no se encuentra registrado'
        }
    }

    // Verifica si el password ingresado corresponde con el que se guardo en la bd
    const validPassword = bcrypt.compareSync(user.password, searchedUser.password);

    // En caso que el password no coincida
    if (!validPassword) {
        return {
            ok: false,
            msg: 'El password es incorrecto'
        }
    }

    // En este punto, el usuario existe e ingreso correctamente el password
    const { id, name, lastName, email } = searchedUser;

    // Genera un token 
    const token = await generateJWT(id, name);

    // Envía como respuesta el usuario junto al token
    return {
        id,
        name,
        lastName,
        email,
        token
    };

}


const create = async (user) => {

    // Se pasa por el body los datos que el usuario ingreso
    // const user = req.body;

    try {
        // Verifica si ya existe un usuario registrado con el email ingresado
        const emailTaken = await User.findOne({ where: { email: user.email } })
        // En el caso que el email ya se encuentre en uso
        if (emailTaken) return { ok: false, msg: 'Este email ya está en uso' };

        // En este punto, el pass ingresado por el usuario se aplica
        // funcion hash para guardar en la db
        user.password = await hashPassword(user.password);

        // Se crea el usuario
        const userCreated = await User.create(user);

        // Se envía como respuesta el usuario creado
        return userCreated;

    // Atrapa en caso de haber algun error
    } catch (error) {
        return {
            ok: false,
            msg: 'Ocurrió un error',
            error
        };

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
                lastName: name.split(" ")[1],
                email,
                password: '',
            }

            await User.create(data);
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

