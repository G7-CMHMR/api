const store = require('./store');

const filterMetods = async (params) => {
    // console.log(params)
    return store.filterBy(params)
}


module.exports = {
    filterMetods
}