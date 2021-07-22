const store = require('./store');

const createQuestion = async (data) => {

	return store.createQuestion(data);
}

const getAllUserQuestion = async (userId) => {
	console.log(userId)
	return store.getAllUserQuestion(userId);
}

const getProductQuestions = async (productId) => {

	return store.getProductQuestions(productId);
}

// const changeOrderStatus = async(orderId) => {

// 	return store.changeOrderStatus(orderId);
// }

module.exports = {
	createQuestion,
	getAllUserQuestion,
	getProductQuestions,
	// changeOrderStatus
};
