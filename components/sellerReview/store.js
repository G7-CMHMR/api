const { Seller_review, Seller, User } = require('../../db');

const store = {
	createSellerReview: async(reviewData) => {
		console.log('LO QUE ME LLEGA A STORE SELLER REVIEW: ', reviewData);
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

		sellerReview.setUser(idUser);
		sellerReview.setSeller(idSeller);
		console.log('LA SELLER REVIEW CREADA: ',sellerReview);
		return sellerReview;
	},
	getSellerReviews: async(idSeller) => {
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
	},
	updateSellerReview: async(idSellerReview) => {

	},
	deleteSellerReview: async(idSellerReview) => {

	}
};

module.exports = store;	
