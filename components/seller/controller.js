const store = require('./store');

const createSeller = async (userId, data) => {

	return store.createSeller(userId, data);
}

const getSeller = async (userId) => {

	return store.getSeller(userId);
}

const updateSeller = async (userId, data) => {

	return store.updateSeller(userId, data);
}

module.exports = {
	createSeller,
	getSeller,
	updateSeller
}