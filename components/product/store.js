const {Product,Save_product_state, Category, Image, Promotion, Seller, Items,  User, Questions} = require('../../db');
const {simplificarProduct, product_attributes} = require('../../aux_functions');
// const e = require('cors');

const store = {
    getOne: async function(product_id){
        let response = await Product.findOne({
            where: { id: product_id},
            attributes: product_attributes,
            include: [
                {
                    model: Seller,
                    attributes: ["id", "location", "reputation"],
                    include: [{
                        model: User,
                         attributes: ["name", "lastName"],
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
                    model:Questions,
                    attributes: {exclude: ['createdAt','updatedAt']}
                    // attributes: ["question","response","date"],
                },
                {
                    model:Promotion,
                    attributes: ["value","delivery"],
                }
            ],
            
        })
        return response
    },
    updateOne: async function(product_id, product_body){

        let response = await Product.findOne({
            where: { id: product_id},
            attributes: product_attributes,
            include: [
                {
                    model: Seller,
                    attributes: ["id","location"],
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
                    model:Items,
                },
                {
                    model:Promotion
                }
            ],
        })
        let propierties = Object.keys(product_body);
        if(response.sold !== response.state){
            let it = await Items.findAll({
                where:{ productId : response.id}
            })
            let save = await Save_product_state.create({
                seller: response.seller.user.name,
                name: response.name,
                status: response.status,
                price: response.price,
                brand: response.brand,
                description: response.description,
                type: response.type,
                prom_delivery: response.promotion.delivery,
                prom_value: response.promotion.value
            })
            it.map(async(e)=>{
                e.saveProductStateId = save.id
                e.productId = null
                await e.save()
            })
            if(response.images[0].id){
                response.images.map(async (e)=>{
                    let im = await Image.findOne({
                        where: {id: e.id}
                    })
                    im.saveProductStateId = save.id
                    await im.save()
                })
            }
        }

        propierties.forEach(e => {
            if(e == 'category' || e == 'images' || e == 'discount' || e == 'delivery'){
            }else{
                response[e] = product_body[e]
            }
        });
        if(product_body.category && product_body.category != ''){
            let old_category = await Category.findOne({
                where:{title: response.categories[0].title}
            });
            let new_category = await Category.findOne({
                where:{title: product_body.category}
            })
            await response.removeCategories(old_category);
            await response.addCategory(new_category)
        };

        const thepromotion = await Promotion.findOne({
            where:{id: response.promotion.id}
        })
        if(product_body.delivery && product_body.delivery != ''){
            thepromotion.delivery = product_body.delivery
        };

        if(product_body.discount && product_body.discount != ''){
            thepromotion.value = product_body.discount
        };
        await response.save()
        await thepromotion.save()

        return await this.getOne(response.id)
    },
    addOne: async function(product_data){
        // console.log(product_data)
        const user = await User.findOne({
            where:{id:product_data.userId},
                include: [{model: Seller}]
        })
        // console.log(user)
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
