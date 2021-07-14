const {Product, Category, User,Image, Seller, Promotion} = require('../../db');
const { Op } = require("sequelize");
const {simplificarProduct} = require('../../aux_functions');

const store = {
    getAll_category: async function(category_name){
        let response = await Category.findOne(
            {
                where: {title: category_name},
                include: [{
                    model: Product,
                    attributes: [ 'name','id','status','price','type','valuation','stock','brand',"sold","warranty",'description'],
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
            attributes: [ 'name','id','status','price','type',"sold","warranty",'valuation','stock','brand','description'],
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
                attributes: [ 'name','id','status','type','price',"sold","warranty",'valuation','stock','brand','description'],
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
    }
};

module.exports = store;