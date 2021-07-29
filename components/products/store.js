const {Product, Category, User, Image, Save_product_state, Purchase_order, Items, Seller, Promotion} = require('../../db');
const { Op } = require("sequelize");
const {simplificarProduct, product_attributes} = require('../../aux_functions');

const store = {
    getAll_category: async function(category_name){
        try{
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
    }catch{return []}
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
    getInterest: async function(data){

        let user = await User.findOne({
            where: {id: data.userId},
            include: [{
                model: Product,
                include: Category
            },{
                model: Purchase_order,
                include: [{
                    model: Items,
                    include: [{
                        model: Product,
                        include: Category
                    },{
                        model: Save_product_state,
                        include: Category
                    }]
                }]
            }]

        })

        let response = [];

        try{
            let fav = user.products;
            if(fav.length){
                response = await Category.findAll({
                    where: {title: fav[fav.length - 1].category.title},
                    include: [{
                        model: Product,
                        where: {visible: true,
                                valide: true,
                                valuation: {[Op.gte]: 3}},
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
            }
        }catch{
            if(user.purchase_orders.length){
                let po = user.purchase_orders[0];

                let category = po.items[0].product ? (po.items[0].product.category):(po.items[0].save_product_state.category);

                response = await Category.findAll({
                    where: {title: category},
                    include: [{
                        model: Product,
                        where: {visible: true,
                                valide: true,
                                valuation: {[Op.gte]: 3}},
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
            }
        }
        return response.products ? (response.products):(response);
    },
    getSeller: async function(params){
        try
{        const seller = await Seller.findOne({
            where: { userId: params.userId },
            include: [{
                model: Product,
                where: {visible: params.visible,
                    visible_lvl_2: true},
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