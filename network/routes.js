const networkProducts = require('../components/products/network');
// const networkProduct = require('../components/product/network');
const networkAuth = require('../components/auth/network');

const routes = (server) => {
    server.use('/products', networkProducts);
    // server.use('/product', networkProduct);
    server.use('/auth', networkAuth);
}

module.exports = routes;