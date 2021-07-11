const networkProducts = require('../components/products/network');
const networkProduct = require('../components/product/network');
const networkAuth = require('../components/auth/network');
const networkCategory = require('../components/category/network');
const networkPreLoad = require('../components/preload/network');

const routes = (server) => {
    server.use('/products', networkProducts);
    server.use('/auth', networkAuth);
    server.use('/category', networkCategory);
    server.use('/product', networkProduct);
    server.use('/pre_load', networkPreLoad);
}

module.exports = routes;