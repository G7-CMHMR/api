const networkProducts = require('../components/products/network');
const networkProduct = require('../components/product/network');
const networkAuth = require('../components/auth/network');
const networkCategory = require('../components/Category/network');

const routes = (server) => {
    server.use('/products', networkProducts);
    server.use('/auth', networkAuth);
    server.use('/category', networkCategory);
    server.use('/product/:product_id', networkProduct);
}

module.exports = routes;