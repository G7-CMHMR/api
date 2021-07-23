const store = require('./store');

const createOrder = async (data) => {

	return store.createOrder(data);
}

const getOrders = async (userId) => {

	return store.getOrders(userId);
}

const getOrderDetail = async (orderId) => {

	return store.getOrderDetail(orderId);
}

// const changeOrderStatus = async(orderId) => {

// 	return store.changeOrderStatus(orderId);
// }

module.exports = {
	createOrder,
	getOrders,
	getOrderDetail,
	//changeOrderStatus
};
