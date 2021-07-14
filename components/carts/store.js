const {Product, Category, Cart , Image, Promotion, Seller, User} = require('../../db');
const {simplificarProduct} = require('../../aux_functions');

const store = {
    addCart: async function(params){

        const cart = await Cart.findOne({
            where: {userId: params.userId},
        })

        const product = await Product.findOne({
            where: {id: params.productId},
        })

        await cart.addProduct(product);

        return [cart,product]
    },
    removeCart: async function(params){
        const cart = await Cart.findOne({
            where: {userId: params.userId},
        })
        const product = await Product.findOne({
            where: {id: params.productId},
        })
        await cart.removeProduct(product)

        return [cart,product]
        
    },
    getCart: async function(userId){
        const cart = await Cart.findOne({
            where: {userId: userId},
            include: [{
                model: Product,
                attributes: [ 'name','status','id','price','valuation',"sold","warranty",'stock','brand','description','type'],
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
            }],
        })
        return cart.products.map((el) => simplificarProduct(el))
    },
};

module.exports = store;