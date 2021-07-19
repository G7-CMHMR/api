const {Product, Category, Image, Promotion, Seller, User} = require('../../db');
const {simplificarProduct, product_attributes} = require('../../aux_functions');
const e = require('cors');

const store = {
    getOne: async function(product_id){
        let response = await Product.findOne({
            where: { id: product_id},
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
            
        })
        return simplificarProduct(response)
    },
    updateOne: async function(product_id, product_body){
        let response = await Product.findOne({
            where: { id: product_id},
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
        })
        let propierties = Object.keys(product_body);
        console.log(product_body);
        propierties.forEach(e => {
            response[e] = product_body[e]
        });
        await response.save()
        return simplificarProduct(response)
    },
    addOne: async function(product_data){
        console.log(product_data)
        const user = await User.findOne({
            where:{id:product_data.userId},
                include: [{model: Seller}]
        })
        console.log(user)
        const product = await Product.create({
            sellerId: user.seller.id,
            name: product_data.name, 
            status: product_data.status, 
            price: parseInt(product_data.price),
            stock: parseInt(product_data.stock),
            description: product_data.description,
            visible: product_data.visible,
            brand: product_data.brand,
            type: product_data.type,
            warranty: parseInt(product_data.warranty),
        })
        const promotion = await Promotion.create({
            title: product_data.title,
            image: product_data.images,
            value: parseInt(product_data.discount),
            delivery: product_data.delivery
        })

        const category = await Category.findOne({
            where:{
                title:product_data.category
            }
        })
        await product.addCategory(category);
        product_data.images.map(async (e) => 
            {
            let image = await Image.create({
                image: e
            })
            await image.setProduct(product)
            }
        )
        await product.setPromotion(promotion.id);

        return product
    },
};

module.exports = store;