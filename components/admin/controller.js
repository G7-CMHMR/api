const store = require('./store');

const getUsers = async (data) => {

	return store.getUsers(data);
}

const changePass = async (data) => {

	return store.changePass(data);
}

const delUser = async (data) => {

	return store.delUser(data);
}


module.exports = {
	getUsers,
	delUser,
	changePass
};
