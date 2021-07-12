const store = require('./store');

const getProduct = async (product_name) => {
    
    return store.getOne(product_name)
}


module.exports = {
    getProduct
}