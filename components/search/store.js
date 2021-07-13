const {Product, Category, Image, Promotion, Seller, User} = require('../../db');
const {simplificarProduct} = require('../../aux_functions');

const store = {
    getOne: async function(product_name){
        let response = await Product.findAll({
            attributes: [ 'name','status','id','price','type','valuation','stock','brand','description'],
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
        response = response.filter( a => 
             a.dataValues.name.toLowerCase().includes(product_name.toLowerCase())
            )
        response = (response.map(e => simplificarProduct(e.dataValues)))
        return response
    }
};

module.exports = store;