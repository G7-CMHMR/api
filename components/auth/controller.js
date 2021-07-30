const bcrypt = require('bcryptjs');

const { User, Cart, Seller } = require('../../db');

const hashPassword = require('./resources/utils/hashPassword');
const { generateJWT } = require('./resources/utils/jwt');
const { googleVerify } = require('./resources/utils/googleVerify')
const sendEmail = require('../../email_config/handler');



const prepareUserDataResponse = async (user) => {
    const userDataResponse = {};

    const token = await generateJWT(user.id, user.name);

    userDataResponse.id = user.id;
    userDataResponse.name = user.name;
    userDataResponse.lastName = user.lastName;
    userDataResponse.email = user.email;
    userDataResponse.phone = user.phone;
    userDataResponse.isSeller = user.isSeller;
    userDataResponse.isGoogleAccount = user.isGoogleAccount;
    userDataResponse.token = token;
    userDataResponse.isAdmin = user.isAdmin;
    userDataResponse.isSuperAdmin = user.superAdmin;
    userDataResponse.passReset = user.passReset; 

    if (user.isSeller){
        const { id: idSeller } = await Seller.findOne({ where: { userId: user.id }});
        userDataResponse.idSeller = idSeller;
    }

    return userDataResponse;
}


const login = async (user) => {

    const userRegistered = await User.findOne({ where: { email: user.email, active: true } });
    if (!userRegistered)  throw { error:'El usuario no se encuentra registrado' };

    const isValidPassword = bcrypt.compareSync(user.password, userRegistered.password);
    if (!isValidPassword) throw { error: 'El password es incorrecto' };

    return prepareUserDataResponse(userRegistered);

}


const create = async (user) => {

    try {
        const userRegisteredWithMail = await User.findOne({ where: { email: user.email } });
        if (userRegisteredWithMail !== null)   throw { error: 'Este email ya está en uso' };

        user.password = await hashPassword(user.password);
        const newUser = await User.create(user);
        const isNewUserCreated = Object.keys(newUser).length > 0;
        const cart = await Cart.create();
        cart.setUser(newUser);
        // const url = `http://${req.headers.host}/auth/confirm-account/${newUser.emailToken}`;
        // const url = `http://localhost:3000/confirm-account/${newUser.emailToken}`;
        const url = `https://pg-cmhmr-client.herokuapp.com/${newUser.emailToken}`;

        sendEmail.send({
            email: newUser.email,
            url,
            emailToken: newUser.emailToken,
            subject: 'Confirmación de cuenta',
            htmlFile: 'confirm.html'
        });
        if (isNewUserCreated)   return { succesfull: 'El usuario se ha creado con exito' };
    
    } catch (error) {
        throw error;
    }
}


const update = async ( userId, { password: userPassword, ...dataToUpdate }) => {

    try{
        const user = await User.findByPk(userId);
        if (!user)  throw { error:'El usuario no se encuentra registrado' };

        if(!user.isGoogleAccount){
            const isValidPassword = bcrypt.compareSync(userPassword, user.password);
            if (!isValidPassword) throw { error: 'El password es incorrecto' };
        }

        if(dataToUpdate.email){
            if(user.email !== dataToUpdate.email){
                const userRegisteredWithMail = await User.findOne({ where: { email: dataToUpdate.email } });
                if (userRegisteredWithMail !== null)   throw { error: 'Este email ya está en uso' };
                user.email = dataToUpdate.email;
            }
        }
        if(dataToUpdate.name)   user.name = dataToUpdate.name;
        if(dataToUpdate.lastName)   user.lastName = dataToUpdate.lastName;
        if(dataToUpdate.email)  user.email = dataToUpdate.email;
        if(dataToUpdate.phone)  user.phone = dataToUpdate.phone;
       
        user.save();

        return prepareUserDataResponse(user);
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


const renewToken = async (id) => {

    const userRegistered = await User.findOne({ where: { id: id } });
    
    return prepareUserDataResponse(userRegistered);
    
};

const googleSignIn = async (id_token) => {
    try {
        const googleUser = await googleVerify(id_token);
        const { name, email } = googleUser;

        let user = await User.findOne({ where: { email } });
        if (!user) {  
            user = await User.create({
                name: name.split(" ")[0],
                lastName: name.split(" ")[1] || ' ',
                email,
                password: '',
                isGoogleAccount: true
            });
            const cart = await Cart.create();
            cart.setUser(user);
        }

        return prepareUserDataResponse(user);

    } catch (error) {
        throw error
    }
};

const confirmAccount = async (emailToken) => {

    const user = await User.findOne({ where:{ emailToken: emailToken }});
    if(!user)   throw { error: 'El usuario no existe'};

    user.active = true;
    user.emailToken = null;
    await user.save();

    return { succesfull: 'La cuenta se ha activado con exito' }
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

