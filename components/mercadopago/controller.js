const store = require('./store');

const createPreference = async (params) => {
    console.log('Entro al controller')
    return store.createPreferences(params)
}

module.exports = {
    createPreference,
}