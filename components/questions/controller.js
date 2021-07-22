const store = require('./store');

const createQuestion = async (data) => {

	return store.createQuestion(data);
}

const getAllUserQuestion = async (userId) => {

	return store.getAllUserQuestion(userId);
}

// const getOrderDetail = async (orderId) => {

// 	return store.getOrderDetail(orderId);
// }

// const changeOrderStatus = async(orderId) => {

// 	return store.changeOrderStatus(orderId);
// }

module.exports = {
	createQuestion,
	getAllUserQuestion,
	// getOrderDetail,
	// changeOrderStatus
};
