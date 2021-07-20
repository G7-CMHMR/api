const store = require('./store')


const createSellerReview = async (review) => {
	try{
		return store.createSellerReview(review);
	} catch(error){
		throw error;
	}
}

const getSellerReviews = async (idSeller) => {
	try{
		return store.getSellerReviews(idSeller);
	} catch(error){
		throw error;
	}
}

const updateSellerReview = async (idSellerReview) => {
	try{
		return store.updateSellerReview(idSellerReview);
	} catch(error){
		throw error;
	}
}

const deleteSellerReview = async (idSellerReview) => {
	try{
		return store.deleteSellerReview(idSellerReview);
	} catch(error){
		throw error;
	}
}

module.exports = {
	createSellerReview,
	getSellerReviews,
	updateSellerReview,
	deleteSellerReview
}