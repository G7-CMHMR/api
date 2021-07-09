const networkProducts = require('../components/products/network');
const networkProduct = require('../components/product/network');

const routes = (server) => {
    server.use('/products', networkProducts);
    server.use('/product', networkProduct);
}

module.exports = routes