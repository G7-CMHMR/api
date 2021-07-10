const {Product} = require('../../db');

const store = {
    getOne: async function(product_id){
        let response = await Category.findOne(
            {
            where: {title: category_name},
            includes: [{model: Product, includes: [{model:Image},{model:Category},{model:Promotions}]}]
            })
        return response
        console.log('En la store de products')
        return 'des-mutear en produscts/controller'
    }
};

module.exports = store;