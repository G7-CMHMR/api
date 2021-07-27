const {Product, Category, User, Image, Seller, Promotion} = require('../../db');
const {simplificarProduct, product_attributes} = require('../../aux_functions');

const store = {
    getUsers: async function(data){
        let admin = await User.findOne({
            where: {id: data.userId}
        })
        if(admin.isAdmin){
            let users = await Users.findAll()
        }else{users = []}
        return Users
    },
};

module.exports = store;