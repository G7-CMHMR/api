const store = require('./store');

const getAllVisibleProducts = async (params) => {
    if(!params){params = {condition : true}}
    return store.getAllVisible(params)
}
const getAllProducts = async () => {
    
    return store.getAll()
}
const getAllProductsByCategory = async (category_name) => {
    
    return store.getAll_category(category_name)
}

const getAllInterest = async (data) => {
    
    return store.getInterest(data)
}

const getAllProductsOffer = async () => {
    
    return store.getAll_offer()
}

const getSellerProducts = async (params) => {
    
    return store.getSeller(params)
}

module.exports = {
    getAllProducts,
    getAllVisibleProducts,
    getAllProductsByCategory,
    getAllProductsOffer,
    getSellerProducts,
    getAllInterest,
}