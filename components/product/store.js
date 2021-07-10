const {Product, Category, Image, Promotions, Seller, User} = require('../../db');

const store = {
    getOne: async function(product_id){
        let response = await Product.findOne(
            {
            where: {id: product_id},
            includes: [{model:Image},{model:Category},{model:Promotions},{model:Seller, includes: [{model:User, atributes: ['name']}]}],
            atributes: [
                'name','status','price','valuation','stock','brand','description','visible'
            ]
            })
        return response
        // console.log('En la store de products')
        // return 'des-mutear en produscts/controller'
    }
};

module.exports = store;