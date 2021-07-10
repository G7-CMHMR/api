const store = require('./store');

const getProduct = async (product_id) => {
    
    return store.getOne(product_id)
}


module.exports = {
    getProduct
}