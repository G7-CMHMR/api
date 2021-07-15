const store = require('./store');

const getProduct = async (product_id) => {
    
    return store.getOne(product_id)
}
const updateProduct = async (product_id, product_body) => {

    return store.updateOne(product_id, product_body)
}


module.exports = {
    getProduct,
    updateProduct
}