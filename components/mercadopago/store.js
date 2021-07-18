const { Product, Category, Image, Promotion, Seller, User } = require('../../db');
const { simplificarProduct, product_attributes } = require('../../aux_functions');

const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken("TEST-3725861636699344-071813-cc6fb36971dea5ad0bddac975d297e9b-226813815");

const store = {

    createPreferences: async function (params) {

        let items = []
        let shipping = 0;
        params.map((element) => {
            if(!element.product.promotion.delivery){shipping=400}
            console.log(element.product.promotion.delivery)
            items.push({
                title: element.product.name,
                unit_price: element.product.price+shipping,
                quantity: element.amount,
            })
            
        })

        console.log(items)

        let preference = {
            items,
            back_urls: {
                "success": "http://localhost:3001/Compras",
                "failure": "http://localhost:3001/Carrito",
                "pending": "http://localhost:3001/Compras"
            },
            auto_return: 'approved',
        };

        console.log('2')

        const res = await mercadopago.preferences.create(preference)

        console.log('3')
        return res;
    },

};

module.exports = store;