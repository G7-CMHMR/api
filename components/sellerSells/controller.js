const store = require('./store');

const getItems = async (data) => {

	return store.getItems(data);
}

const getSellerItems = async (data) => {

	return store.getSellerItems(data);
}

const getSellerItemsFilter = async (data) => {

	return store.getSellerItemsFilter(data);
}

const changeItemStatus = async (data) => {

	return store.changeItemStatus(data);
}

module.exports = {
	getItems,
	getSellerItems,
	changeItemStatus,
	getSellerItemsFilter
}