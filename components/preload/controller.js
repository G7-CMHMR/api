const store = require('./store');

const addPreLoad = async () => {
    
    return store.addAll()
}


module.exports = {
    addPreLoad
}