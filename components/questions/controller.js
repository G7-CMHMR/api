const store = require('./store');

const createQuestion = async (data) => {

	return store.createQuestion(data);
}

// const getOrders = async (userId) => {

// 	return store.getOrders(userId);
// }

// const getOrderDetail = async (orderId) => {

// 	return store.getOrderDetail(orderId);
// }

// const changeOrderStatus = async(orderId) => {

// 	return store.changeOrderStatus(orderId);
// }

module.exports = {
	createQuestion,
	// getOrders,
	// getOrderDetail,
	// changeOrderStatus
};
