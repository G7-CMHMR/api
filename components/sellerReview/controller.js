const store = require('./store')


const createSellerReview = async (reviewData) => {
	console.log('ENTRO AL CONTROLER DE REVIEW: ', reviewData)
		return store.createSellerReview(reviewData);
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