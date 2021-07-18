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
        const user = await User.findOne({
            where:{
                id:product_data.userId},
            include: [{
                model: Seller}]
        })

        const product = await Product.create({
            sellerId: user.seller.id,
            name: product_data.name, 
            status: product_data.status, 
            price: product_data.price,
            stock: product_data.stock,
            description: product_data.description,
            visible: product_data.visible,
            brand: product_data.brand,
            type: product_data.type,
            warranty: product_data.warranty
        })
        const promotion = await Promotion.create({
            title: product_data.promotion.title,
            image: product_data.promotion.image,
            value: product_data.promotion.value,
            delivery: product_data.promotion.delivery
        })

        const category = await Category.findOne({
            where:{
                title:product_data.category
            }
        })
        await product.addCategory(category);
        // product_data.images.map(async (e) => 
        //     {
        //     await Image.create({
        //         url: e
        //     })
        //     await image.setProduct(product.id)
        //     }
        // )
        await product.setPromotion(promotion.id);

        return product
    },
};

module.exports = store;