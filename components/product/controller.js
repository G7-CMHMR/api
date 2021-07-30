const store = require('./store');

const getProduct = async (product_id) => {
    
    return store.getOne(product_id)
}
const updateProduct = async (product_id, product_body) => {

    return store.updateOne(product_id, product_body)
}
const addProduct = async (product_body) => {

    return store.addOne(product_body)
}
const hideOne = async (product_body) => {

    return store.hideOne(product_body)
}


module.exports = {
    getProduct,
    updateProduct,
    addProduct,
    hideOne
}