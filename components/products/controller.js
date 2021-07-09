const store = require('./store').default;


const getAllProducts = async function(){
    return store.getAll()
}


module.exports = {
    getAllProducts
}