const {Product, Category, Image, Promotion} = require('../../db');

const store = {
    getAll_category: async function(category_name){
        let response = await Category.findOne(
            {
            where: {title: category_name},
            includes: [{model: Product, includes: [{model:Image},{model:Category},{model:Promotion}]}]
            })
        return response
    },
    getAll: async function(){
        let response = await Product.findAll({
        includes: [{model:Image},{model:Category},{model:Promotion}],
            atributes: [
                'name','status','price','valuation','stock','brand','description','visible'
            ]});
        return response
    }
};

module.exports = store;