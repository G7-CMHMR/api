const store = require('./store');

const getAllCategory = async () => {
    return store.getAll()
}
const postCategory = async (category_name) => {
    return store.postOne(category_name)
}


module.exports = {
    getAllCategory,
    postCategory
}