const store = require('./store');

const getAllProducts = async () => {
    
    return store.getAll()
}
const getAllProductsByCategory = async (category_name) => {
    
    return store.getAll_category(category_name)
}

const getAllProductsOffer = async () => {
    
    return store.getAll_offer()
}


module.exports = {
    getAllProducts,
    getAllProductsByCategory,
    getAllProductsOffer
}