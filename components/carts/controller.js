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

const eraseCart = async (params) => {
    
    return store.eraseCart(params)
}

const decrementCart = async (params) => {
    
    return store.decrementItem(params)
}

const incrementCart = async (params) => {
    
    return store.incrementItem(params)
}

const adjustItemAmount = async (params) => {
    
    return store.adjustItemAmount(params)
}
module.exports = {
    addCart,
    removeCart,
    getCart,
    decrementCart,
    eraseCart,
    incrementCart,
    adjustItemAmount
}