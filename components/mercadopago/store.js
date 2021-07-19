const { Product, Category, Image, Promotion, Seller, User } = require('../../db');
const { simplificarProduct, product_attributes } = require('../../aux_functions');

const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken("TEST-3725861636699344-071813-cc6fb36971dea5ad0bddac975d297e9b-226813815");

const store = {

    createPreferences: async function (params) {

        let items = []
        let shipping = 0;

        params.map((element) => {

            if (!element.product.promotion.delivery) { shipping = 400 }
        items.push({
            title: element.product.name,
            unit_price: Math.floor(((element.product.price) - ((element.product.price * element.product.promotion.value)/100)) + shipping),
            quantity: element.amount,
        })

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