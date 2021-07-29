const store = require('./store');

const getUsers = async (data) => {

	return store.getUsers(data);
}

const searchUser = async (data) => {

	return store.searchUser(data);
}

const changePass = async (data) => {

	return store.changePass(data);
}

const becomeUser = async (data) => {

	return store.becomeUser(data);
}

const delUser = async (data) => {
	console.log(data)
	return store.delUser(data);
}

const getAllPC = async (data) => {

	return store.getAllPC(data);
}

const makeReview = async (data) => {

	return store.makeReview(data);
}

const changeCategory = async (data) => {

	return store.changeCategory(data);
}
const incompletePC = async (data) => {

	return store.incompletePC(data);
}


module.exports = {
	getUsers,
	delUser,
	changePass,
	becomeUser,
	getAllPC,
	makeReview,
	searchUser,
	changeCategory,
	incompletePC
};
