const {Product, Category, Image, Promotion, Seller, User} = require('../../db');

const simplificarProduct = function(product){
    const res = {
        name: product.name,
        status: product.status,
        price: product.price,
        valuation: product.valuation,
        stock: product.stock,
        brand: product.brand,
        description: product.description,
        seller: product.seller.user.name,
        images: product.images.map((image) => image.image),
        categories: product.categories.map((category) => category.title),
        discount: product.promotion.value,
        delivery: product.promotion.delivery,
        id: product.id,

    }
    return res;
}
const store = {
    filterBy: async function(params){
        let param_category =  params.category ? params.category : false;
        let param_shipping =  params.shipping.length ? params.shipping : false;
        let param_condition =  params.condition ? params.condition : false;
        let param_min_price =  params.min_price ? params.min_price : false;
        let param_max_price =  params.max_price ? params.max_price : false;
        // let param_type =  params.type ? params.type : false;
        let param_brand =  params.brand ? params.brand : false;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',param_category, param_shipping, param_condition, param_min_price, param_max_price, param_brand)

    let all_products = await Product.findAll({
        attributes: [ 'name','id','status','price','valuation','stock','brand','description'],
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
    if(param_category){
        all_products = all_products.filter( e => {e.categories.includes(param_category)})
    };
    if(param_shipping){
        all_products = all_products.filter( e => {e.delivery === true})
    };
    if(param_condition){
        all_products = all_products.filter( e => {e.status == param_condition })
    };
    if(param_min_price){
        all_products = all_products.filter(e => {e.price - (e.price * e.discount) >= param_min_price})
    };
    if(param_max_price){
        all_products = all_products.filter(e => {e.price - (e.price * e.discount) <= param_max_price})
    };
    if(param_brand){
        all_products = all_products.filter( e => {e.brand == param_brand})
    };
    return all_products;
    }
};

module.exports = store;