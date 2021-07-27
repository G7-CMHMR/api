const store = require('./store');

const getUsers = async (data) => {

	return store.getUsers(data);
}

const changePass = async (data) => {

	return store.changePass(data);
}

const becomeUser = async (data) => {

	return store.becomeUser(data);
}

const delUser = async (data) => {

	return store.delUser(data);
}

const getAllPC = async (data) => {

	return store.getAllPC(data);
}


module.exports = {
	getUsers,
	delUser,
	changePass,
	becomeUser,
	getAllPC
};
