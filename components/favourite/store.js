const {Product, Category, Image, Promotion, Seller, User} = require('../../db');
const {simplificarProduct} = require('../../aux_functions');

const store = {
    addFavourite: async function(params){

        const user = await User.findOne({
            where: {id: params.userId},
        })
        const product = await Product.findOne({
            where: {id: params.productId},
        })
        await user.addProduct(product);

        return [user,product]
    },
    removeFavourite: async function(params){
        const user = await User.findOne({
            where: {id: params.userId},
        })
        const product = await Product.findOne({
            where: {id: params.productId},
        })
        await user.removeProduct(product)
        .catch(err => console.log(err))

        return [user,product]
        
    },
    getFavourites: async function(userId){
        const user = await User.findOne({
            where: {id: userId},
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
        return user.products.map((el) => simplificarProduct(el))
    },
};

module.exports = store;