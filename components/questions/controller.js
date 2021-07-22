const store = require('./store');

const createQuestion = async (data) => {

	return store.createQuestion(data);
}

const getAllUserQuestion = async (userId) => {
	
	return store.getAllUserQuestion(userId);
}

const getProductQuestions = async (productId) => {

	return store.getProductQuestions(productId);
}

const updateResponse = async(params) => {

	return store.updateResponse(params);
}

const deleteQuestion = async(params) => {

	return store.deleteQuestion(params);
}

module.exports = {
	createQuestion,
	getAllUserQuestion,
	getProductQuestions,
	updateResponse,
	deleteQuestion
};
