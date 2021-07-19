const {Product, Category, Cart , Image, Promotion, Seller, User, Items} = require('../../db');
const {product_attributes} = require('../../aux_functions');

const store = {
    addCart: async function(params){
        const cart = await Cart.findOne({
            where: {userId: params.userId},
        })
        const product = await Product.findOne({
            where: {id: params.productId},
        })
        let items = await Items.findOne({
            where: {cartId: cart.id,
                productId: product.id
            },
        })

        if(items){
            items.amount = items.amount +1;
            items.save();
        }else{
            items = await Items.create({
                amount: 1
            })
            items.setCart(cart);
            items.setProduct(product);
        }

        return [cart,items]
    },
    removeCart: async function(params){
        const cart = await Cart.findOne({
            where: {userId: params.userId},
        })
        const product = await Product.findOne({
            where: {id: params.productId},
        })

        let items = await Items.findOne({
            where: {cartId: cart.id,
                productId: product.id
            },
        })
        await items.destroy();

        return `Se eliminó el producto '${product.name}' exitosamente`;
    },
    getCart: async function(userId){
        const cart = await Cart.findOne({
            where: {userId: userId},
            include: [{
                model: Items,
                attributes: ['amount'],
                include: [
                    {
                        model: Product,
                        attributes: product_attributes,
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
                    }
                ]
            }],
        })
        return cart.items.map( (el) => {
            const item = {
                amount: el.amount,
                product: el.dataValues.product
            };
            return item;
        })
    },

    decrementItem: async function(params){
        const cart = await Cart.findOne({
            where: {userId: params.userId},
        })
        const product = await Product.findOne({
            where: {id: params.productId},
        })
        let items = await Items.findOne({
            where: {cartId: cart.id,
                productId: product.id
            },
        })

        if(items.amount){
            if(items.amount > 1){
                items.amount = items.amount -1;
                items.save();
            }else{
                throw ('no se puede disminuir la cantidad de elementos')
                }

        }else{throw ('no existe este elemento')}

        return [cart,items]
    },
};

module.exports = store;