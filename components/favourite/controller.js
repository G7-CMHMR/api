const store = require('./store');

const addFavourite = async (params) => {

    return store.addFavourite(params)
}

const removeFavourite = async (params) => {
    
    return store.removeFavourite(params)
}

const getFavourites = async (params) => {
    
    return store.getFavourites(params)
}
module.exports = {
    addFavourite,
    removeFavourite,
    getFavourites
}