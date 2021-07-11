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
    getOne: async function(product_id){
        let response = await Product.findOne({
            where: { id: product_id},
            attributes: [ 'name','status','id','price','valuation','stock','brand','description'],
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