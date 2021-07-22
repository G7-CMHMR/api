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

const answerQuestion = async(params) => {

	return store.answerQuestion(params);
}

const updateQuestion = async(params) => {

	return store.updateQuestion(params);
}

module.exports = {
	createQuestion,
	getAllUserQuestion,
	getProductQuestions,
	answerQuestion,
	updateQuestion,
};
