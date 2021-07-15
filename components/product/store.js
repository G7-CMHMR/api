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
    }
};

module.exports = store;