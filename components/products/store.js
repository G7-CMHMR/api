const {Product, Category, User, Image, Seller, Promotion} = require('../../db');
const { Op } = require("sequelize");
const {simplificarProduct, product_attributes} = require('../../aux_functions');

const store = {
    getAll_category: async function(category_name){
        let response = await Category.findOne(
            {
                where: {title: category_name},
                include: [{
                    model: Product,
                    where: {visible: true,
                        valide: true},
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
                    
                }]
            })
        return response.products.map((el) => simplificarProduct(el))
    },
    getAllVisible: async function(params){

        let response = await Product.findAll({
            where:{visible:params.condition},
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

        return response.map((el) => simplificarProduct(el))
    },
    getAll: async function(){

        let response = await Product.findAll({
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

        return response.map((el) => simplificarProduct(el))
    },
    getAll_offer: async function(){
        let response = await Promotion.findAll({
            where:{ value: {[Op.ne]: 0} },
            include: [{
                model: Product,
                where: {visible: true,
                    valide: true},
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
                
            }]

        })
        return response.map(el => simplificarProduct(el.product))
    },
    getSeller: async function(params){
        try
{        const seller = await Seller.findOne({
            where: { userId: params.userId },
            include: [{
                model: Product,
                where: {visible: params.visible},
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
            }]
        })
        return seller.products.map((el) => simplificarProduct(el))}
        catch{return []}
    }
};

module.exports = store;