const store = require('./store');

const getAllCategory = async () => {
    return store.getAll()
}
const postCategory = async (category_data) => {
    return store.postOne(category_data)
}


module.exports = {
    getAllCategory,
    postCategory
}