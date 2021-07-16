const store = require('./store');

const createOrder = async (data) => {

	return store.createOrder(data);
}

const getOrders = async () => {

	return store.getOrders();
}

const getOrderDetail = async (orderId) => {

	return store.getOrderDetail();
}

const changeOrderStatus = async(orderId) => {

	return store.changeOrderStatus(orderId);
}

module.exports = {
	createOrder,
	getOrders,
	getOrderDetail,
	changeOrderStatus
};
