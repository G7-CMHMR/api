const {Product, Category, Image, Promotion, Seller, User} = require('../../db');
const {simplificarProduct} = require('../../aux_functions');

const store = {
    getOne: async function(product_id){
        let response = await Product.findOne({
            where: { id: product_id},
            attributes: [ 'name','status','id','price','valuation','stock','brand','description','type'],
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
        return simplificarProduct(response)
    }
};

module.exports = store;