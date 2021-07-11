const {Product, Category, Image, Promotion, Seller, User} = require('../../db');

const store = {
    getOne: async function(product_id){
        let response = await Product.findOne(
            {
            where: {id: product_id},
            includes: [{model:Image},{model:Category},{model:Promotion},{model:Seller, includes: [{model:User, atributes: ['name']}]}],
            atributes: [
                'name','status','price','valuation','stock','brand','description','visible'
            ]
            })
        return response
    }
};

module.exports = store;