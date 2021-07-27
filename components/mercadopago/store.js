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
                productid = element.product.id
            }

            items.push({
                title: element.product.name,
                unit_price: Math.floor(((element.product.price) - ((element.product.price * element.product.promotion.value) / 100)) + shipping),
                quantity: element.amount,
            })
        })

        if (error != '') { return { error, productid } }
        if (errorChangeAmount != '') { return { errorChangeAmount, newAmount, productid } }

        params.map(async (element) => {
            let products = await Product.findOne({
                where: {
                    id: element.product.id
                }
            })
            products.stock = products.stock - element.amount
            if (products.stock == 0) { products.visible = false }
            await products.save()
        })

        let date = new Date();
        date.setHours(date.getHours() - 3);
        date = date.toISOString()
        date = date.replace('Z', '-03:00');
        let dateExpired = new Date();
        dateExpired.setHours(dateExpired.getHours() - 3);
        dateExpired.setMinutes(dateExpired.getMinutes() + 1);
        let dateExpiredParsed = dateExpired.toISOString();
        dateExpired = dateExpiredParsed.replace('Z', '-03:00');

        // console.log(date)
        // console.log(dateExpired)


        let preference = {
            items,
            binary_mode: true,
            expires: true,
            expiration_date_from: date,
            expiration_date_to: dateExpired,

            payment_methods: {
                //Para SACAR ALGUNA TARJETA EN ESPECIFICO:
                // excluded_payment_methods: [
                //     {    
                //         "id": "master"
                //     }
                // ],
                excluded_payment_types: [
                    {
                        id: "ticket",
                    },
                    {
                        id: "atm"
                    }
                ],
                installments: 12
            },
        };

        const res = await mercadopago.preferences.create(preference)
        return res;
    },



};

module.exports = store;
