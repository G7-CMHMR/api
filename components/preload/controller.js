const store = require('./store');

const addPreLoad = async () => {
    console.log('Entro al preload')
    return store.addAll()
}


module.exports = {
    addPreLoad
}