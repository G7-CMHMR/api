const store = require('./store');

const addCart = async (params) => {

    return store.addCart(params)
}

const removeCart = async (params) => {
    
    return store.removeCart(params)
}

const getCart = async (params) => {
    
    return store.getCart(params)
}
module.exports = {
    addCart,
    removeCart,
    getCart
}