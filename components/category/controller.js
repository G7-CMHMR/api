const store = require('./store');

const getAllCategory = async () => {
    return store.getAll()
}
const postCategory = async (data) => {
    return store.postOne(data)
}
const postType = async (data) => {
    return store.addType(data)
}
const editCategory = async (data) => {
    return store.editCategory(data)
}


module.exports = {
    getAllCategory,
    postCategory,
    postType,
    editCategory,
}