const store = require('./store');

const filterMetods = async (params) => {
    
    return store.filterBy(params)
}


module.exports = {
    filterMetods
}