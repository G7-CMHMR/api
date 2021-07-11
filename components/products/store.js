const {Product, Category, User ,Image, Seller, Promotion} = require('../../db');

const store = {
    getAll_category: async function(category_name){
        let response = await Category.findOne(
            {
            where: {title: category_name},
            include: [{model: Product, includes: [{model:Image},{model:Category},{model:Promotion}]}]
            })
        return response
    },
    getAll: async function(){
        let response = await Product.findAll({
            where: {visible: true},
            attributes: [ 'name','status','price','valuation','stock','brand','description'],
            include: [
                {
                    model: Seller,
                    attributes: ["id"],
                    include: [{
                        model: User,
                         attributes: ["name"],
                    }]
                },
                {
                    model:Image,
                    attributes: ["image"],
                },
                {
                    model:Category,
                    attributes: ["title"],
                },
                {
                    model:Promotion,
                    attributes: ["value","delivery"],
                }
            ],
        })
        return response
    }
};

module.exports = store;