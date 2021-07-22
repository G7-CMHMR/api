const { Product, Category, Image, Promotion, Seller, User } = require('../../db');
const { simplificarProduct, product_attributes } = require('../../aux_functions');

const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken("TEST-3725861636699344-071813-cc6fb36971dea5ad0bddac975d297e9b-226813815");

const store = {

    createPreferences: async function (params) {

        console.log(params)

        let items = []
        let shipping = 0;
        let error = '';
        let errorChangeAmount = '';
        let productid = ''
        let newAmount = ''

        params.map((element) => {

            if (!element.product.promotion.delivery) { shipping = 400 } //result.name.substring(0, maxCharactersResults)
            if (element.product.stock < 1) { error = `No hay mas stock del producto ${element.product.name.substring(0, 24)}, tuvimos que removerlo de tu carrito`; productid = element.product.id }
            if (element.product.stock < element.amount) {
                errorChangeAmount = `¡No hay suficientes ${element.product.name.substring(0, 24)}, cambiamos la cantidad a ${element.product.stock} unidades!`;
                newAmount = element.product.stock
            }
            if (error != '') { return { error, productid } }
            if (errorChangeAmount != '') { return { errorChangeAmount, newAmount } }

            items.push({
                title: element.product.name,
                unit_price: Math.floor(((element.product.price) - ((element.product.price * element.product.promotion.value) / 100)) + shipping),
                quantity: element.amount,
            })
        })

        params.map(async (element) => {
            let products = await Product.findOne({
                where: {
                    id : element.product.id
                }
            })
            console.log(products.stock)
            console.log(typeof(element.amount))
            console.log(element.amount)
            console.log(products.stock - element.amount)
            products.stock = products.stock - element.amount
            if(products.stock == 0){products.visible = false}
            await products.save()
            //console.log(products)
        })

        let preference = {
            items,
            back_urls: {
                "success": "http://localhost:3000/Compras",
                "failure": "http://localhost:3000/Carrito",
                "pending": "http://localhost:3000/Compras"
            },
            auto_return: 'approved',
        };


        const res = await mercadopago.preferences.create(preference)

        return res;
    },

};

module.exports = store;