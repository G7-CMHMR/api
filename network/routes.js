const networkProducts = require('../components/products/network');
const networkProduct = require('../components/product/network');
const networkAuth = require('../components/auth/network');
const networkCategory = require('../components/category/network');
const networkfilterMetods = require('../components/filterMetods/network');
const networksearch = require('../components/search/network');
const networkfav = require('../components/favourite/network');
const networkcart = require('../components/carts/network');
const networkpurchaseOrder = require('../components/purchaseOrder/network');
const networkSeller = require('../components/seller/network');

const routes = (server) => {
    server.use('/products', networkProducts);
    server.use('/auth', networkAuth);
    server.use('/category', networkCategory);
    server.use('/product', networkProduct);
    server.use('/filterMetods', networkfilterMetods);
    server.use('/search', networksearch);
    server.use('/favourite', networkfav);
    server.use('/cart', networkcart);
    server.use('/purchaseOrder', networkpurchaseOrder);
    server.use('/seller', networkSeller);
}

module.exports = routes;