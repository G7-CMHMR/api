const {Product, Category, Image, Promotion, Seller, User} = require('./db');
const json_users = require('./jsons_files/json_users')
const json_categories = require('./jsons_files/json_categories')
const json_products = require('./jsons_files/json_products')


    const addProducts= async function(){
        json_categories.forEach(async function(add_title){
            await Category.create({title: add_title});
          })
        json_users.forEach(async function (add_user) {
            let new_user = {
                name: add_user.name
                ,lastName: add_user.lastName
                ,email: add_user.mail
                ,password: '456'
                ,dni:add_user.dni
                ,phone:add_user.phone
                ,address:add_user.address
            };
            let user_db = await User.create(new_user);
            let new_seller = {
                accountBank: add_user.seller.accountBank
                ,address: add_user.seller.address
                ,reputation: add_user.seller.reputation
                ,commission: add_user.seller.comission
                ,userId: user_db.dataValues.id
            };
            let seller_db = await Seller.create(new_seller);
        })
        await new Promise(r => setTimeout(r, 5));
        json_products.forEach(async function (add_product) {
            let b = await User.findOne({where: {name : add_product.seller}})
            let c = await Seller.findOne({where: {userId : b.dataValues.id}})
            
            let new_product = {
                name : add_product.name
                ,status: add_product.status
                ,price: add_product.price
                ,valuation: add_product.valuation
                ,stock: add_product.stock
                ,brand: add_product.brand
                ,description: add_product.description
                ,visible: add_product.visible
                ,sellerId: c.dataValues.id
            };
            let product_db = await Product.create(new_product);
            add_product.category.forEach(async (category) => {
                let a = await Category.findOne({where: {title : category}})
                a.addProduct(product_db)
            })
            c.addProduct(product_db);
            
            add_product.image.forEach(async (curent_image) => {
                let d = await Image.create({image: curent_image});
                product_db.addImage(d)
            });
            let new_promotion = {
                title: add_product.promotion.title
                ,image: add_product.promotion.image
                ,value: add_product.promotion.value
                ,delivery: add_product.promotion.delivery
                ,productId: product_db.dataValues.id
            };
            let e = await Promotion.create(new_promotion)
        })

        await new Promise(r => setTimeout(r, 5));
        return "Se cargaron los productos";
    };

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
            id: product.id,
    
        }
        return res;
    }


module.exports = {
    addProducts,
    simplificarProduct,
}