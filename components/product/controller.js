const store = require('./store');

const getProduct = async () => {
    
    return store.getOne()
}


module.exports = {
    getProduct
}