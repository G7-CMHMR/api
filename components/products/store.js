// const {Product, Category, Image, Promotions} = require('../../db');

const store = {
    getAll_category: async function(category_name){
        // let response = await Category.findOne(
        //     {
        //     where: {title: category_name},
        //     includes: [{model: Product, includes: [{model:Image},{model:Category},{model:Promotions}]}]
        //     })
        // return response
        console.log('En la store de products')
        return 'des-mutear en produscts/controller'
    },
    getAll: async function(){
        // let response = await Product.findAll({
        // includes: [{model:Image},{model:Category},{model:Promotions}],
        //     atributes: [
        //         'name','status','price','valuation','stock','brand','description','visible'
        //     ]});
        // return response
        console.log('En la store de products')
        return 'des-mutear en produscts/controller'
    }
};

module.exports = store;