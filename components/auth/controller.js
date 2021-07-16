const bcrypt = require('bcryptjs');

const { User, Cart } = require('../../db');

const hashPassword = require('./resources/utils/hashPassword');
const { generateJWT } = require('./resources/utils/jwt');
const { googleVerify } = require('./resources/utils/googleVerify')
const sendEmail = require('../../email_config/handler');

const login = async (user) => {

    const userRegistered = await User.findOne({ where: { email: user.email, active: true } });
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
        lastName,
        email,
        token
    };

}


const create = async (user) => {

    try {
        const userRegisteredWithMail = await User.findOne({ where: { email: user.email } });
        if (userRegisteredWithMail !== null)   throw { error: 'Este email ya está en uso' };

        user.password = await hashPassword(user.password);

        const newUser = await User.create(user);

        const cart = await Cart.create(cart);

        User.addCart(cart);

        const isNewUserCreated = Object.keys(newUser).length > 0;
        const cart = await Cart.create();
        cart.setUser(newUser);
        // const url = `http://${req.headers.host}/auth/confirm-account/${newUser.emailToken}`;
        const url = `http://localhost:3000/confirm-account/${newUser.emailToken}`;

        sendEmail.send({
            email: newUser.email,
            url,
            emailToken: newUser.emailToken,
            subject: 'Confirmación de cuenta',
            htmlFile: 'confirm.html'
        });
        
        if (isNewUserCreated)   return { succesfull: 'El usuario se ha creado con exito' };


    // Atrapa en caso de haber algun error
    } catch (error) {
        throw error;
    }
}


const update = async ( userId, { password: userPassword, ...dataToUpdate }) => {

    try{
        const user = await User.findByPk(userId);
        if (!user)  throw { error:'El usuario no se encuentra registrado' };

        const isValidPassword = bcrypt.compareSync(userPassword, user.password);
        if (!isValidPassword) throw { error: 'El password es incorrecto' };

        if(dataToUpdate.email){
            const userRegisteredWithMail = await User.findOne({ where: { email: dataToUpdate.email } });
            if (userRegisteredWithMail !== null)   throw { error: 'Este email ya está en uso' };
        }
        if(dataToUpdate.name)   user.name = dataToUpdate.name;
        if(dataToUpdate.lastName)   user.lastName = dataToUpdate.lastName;
        if(dataToUpdate.email)  user.email = dataToUpdate.email;
       
        user.save();

        return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email
        }
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}


const updatePassword = async ( userId, password) => {
    try{
        const user = await User.findByPk(userId);
        if (!user)  throw { error:'El usuario no se encuentra registrado' };

        const isValidPassword = bcrypt.compareSync(password.oldPassword, user.password);
        if (!isValidPassword) throw { error: 'El password es incorrecto' };

        user.password = await hashPassword(password.newPassword);

        user.save();

        return { succesfull: 'La contraseña se ha modificado con exito' };

    } catch (error) {
        throw error;
    }
}


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
            const cart = await Cart.create();
            cart.setUser(user);
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

const confirmAccount = async (req, res) => {

    const user = await User.findOne({ where:{ emailToken: req.params.emailToken }});
    // const user = await User.findOne({ where:{ email: req.params.email }});
    
    if (!user) {
        return res.status(404).json({
            msg: 'El usuario no existe'
        });
    };

    user.active = true;
    user.emailToken = null;
    await user.save();

    return res.json({
        msg: 'Usuario confirmado'
    })
};


module.exports = {
    create,
    login,
    update,
    updatePassword,
    renewToken,
    googleSignIn,
    confirmAccount
}

