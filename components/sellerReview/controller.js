const store = require('./store')


const createSellerReview = async (review) => {

	return store.createSellerReview(review);
}

const getSellerReviews = async (idSeller) => {
	
	return store.getSellerReviews(idSeller);
}

const updateSellerReview = async (idSellerReview) => {
	
	return store.updateSellerReview(idSellerReview);
}

const deleteSellerReview = async (idSellerReview) => {
	
	return store.deleteSellerReview(idSellerReview);
}

module.exports = {
	createSellerReview,
	getSellerReviews,
	updateSellerReview,
	deleteSellerReview
}