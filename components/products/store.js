const {Product, Category, User ,Image, Seller, Promotion} = require('../../db');

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

    }
    return res;
}

const store = {
    getAll_category: async function(category_name){
        let response = await Category.findOne(
            {
                where: {title: category_name},
                include: [{
                    model: Product,
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
                    
                }]
            })
        return response.products.map((el) => simplificarProduct(el))
    },
    getAll: async function(){
        let response = await Product.findAll({
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

        return response.map((el) => simplificarProduct(el))
    }
};

module.exports = store;