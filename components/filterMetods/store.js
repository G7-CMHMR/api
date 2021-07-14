const {Product, Category, Image, Promotion, Seller, User} = require('../../db');
const {simplificarProduct} = require('../../aux_functions');

const store = {
    filterBy: async function(params){
        let param_category =  params.category ? params.category : false;
        let param_shipping =  params.shipping.length ? params.shipping : false;
        let param_condition =  params.condition ? params.condition : false;
        let param_min_price =  params.min_price ? params.min_price : false;
        let param_max_price =  params.max_price ? params.max_price : false;
        let param_type =  params.type ? params.type : false;
        let param_brand =  params.brand ? params.brand : false;

    let all_products = await Product.findAll({
        attributes: [ 'name','status','price','id','valuation','type','stock','brand','description', 'visible','sold','warranty'],
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
        all_products = all_products.map( e => simplificarProduct(e));
        // console.log(param_category)

    if(param_max_price){
        all_products = all_products.filter(e => (e.price - ((e.price / 100 )* e.discount)) <= param_max_price)
    };

    if(param_min_price){
        all_products = all_products.filter(e => (e.price - ((e.price / 100 )* e.discount)) >= param_min_price)
    };

    if(param_category){
        all_products = all_products.filter( e =>  e.categories.includes(param_category))
    };

    if(param_type){
        all_products = all_products.filter( e =>  e.type.includes(param_type))
    };

    if(param_brand){
        all_products = all_products.filter( e => e.brand == param_brand)
    };

    if(param_shipping){
        all_products = all_products.filter( e => e.delivery == true)
    };

    if(param_condition){
        all_products = all_products.filter( e => e.status == param_condition )
    };

    return all_products;
    }
};

module.exports = store;