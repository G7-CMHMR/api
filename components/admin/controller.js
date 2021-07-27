const store = require('./store');

const getUsers = async (data) => {

	return store.getUsers(data);
}


module.exports = {
	getUsers,
};
