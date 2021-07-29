const { Seller_review, Seller, User } = require('../../db');


const calculateReputation = async (idSeller) => {
	let reputation = 0;
	const reviews = await getSellerReviews(idSeller);
	for (var i = 0; i < reviews.length; i++ ){
		reputation = reputation + reviews[i].type;
	}
	reputation = Math.round(reputation / i);
	if (reputation > 5)	reputation = 5;
	if (reputation < 1)	reputation = 1;
	return reputation;
}

const createSellerReview = async(reviewData) => {
		const { idSeller, idUser, review } = reviewData;

		const seller = await Seller.findOne({ where: { id: idSeller}});
		if (!seller)	throw { error: 'No se encuentra el vendedor correspondiente a la id' };

		const user = await User.findOne({ where: { id: idUser}});
		if (!user)	throw { error: 'El usuario no es valido'};

		const sellerReview = await Seller_review.create({
			title: review.title,
			type: review.type,
			date: new Date(),
			message: review.message
		});

		if (!sellerReview)	throw { error: 'No se pudo crear la review'};
		
		await sellerReview.setUser(idUser);
		await sellerReview.setSeller(idSeller);
		seller.reputation = await calculateReputation(idSeller);
		await seller.save();
		console.log('LA REPUTACION DEL VENDEDOR: ', seller.reputation);
		return sellerReview;
};

const getSellerReviews = async(idSeller) => {
		console.log('LO QUE LLEGA A STORE EN GETSELLERREVIEWS: ',idSeller);
		const seller = await Seller.findOne({ where: { id: idSeller}});
		if (!seller)	throw { error: 'No se encuentra el vendedor correspondiente a la id' };

		const reviews = await Seller_review.findAll({
			where: { sellerId: idSeller },
			attributes: ["userId", "title", "message", "type", "date"],
			include: {
				model: User,

				attributes: ["name"]
			}
		});
		console.log('LAS REVIEWS DEL SELLER: ', reviews);
		return reviews;
};

const updateSellerReview = async(idSellerReview) => {

};

const deleteSellerReview = async(idSellerReview) => {

};


module.exports = {
	calculateReputation,
	createSellerReview,
	getSellerReviews,
	updateSellerReview,
	deleteSellerReview
};	
