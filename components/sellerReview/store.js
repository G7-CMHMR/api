const { Seller_review, Seller, User } = require('../../db');

const store = {
	createSellerReview: async(review) => {
		const { idSeller, idUser, title, type, message } = review;

		const seller = await Seller.findOne({ where: { id: idSeller}});
		if (!seller)	throw { error: 'No se encuentra el vendedor correspondiente a la id' };

		const user = await User.findOne({ where: { id: idUser}});
		if (!user)	throw { error: 'El usuario no es valido'};

		const sellerReview = await Seller_review.create({
			title: title,
			type: type,
			date: new Date(),
			message: message
		});

		if (!sellerReview)	throw { error: 'No se pudo crear la review'};

		sellerReview.setUser(idUser);
		sellerReview.setSeller(idSeller);

		return sellerReview;
	},
	getSellerReviews: async(idSeller) => {
		const seller = await Seller.findOne({ where: { id: idSeller}});
		if (!seller)	throw { error: 'No se encuentra el vendedor correspondiente a la id' };

		const reviews = await Seller_review.findAll({
			where: { idSeller: idSeller }
		});

		return reviews;
	},
	updateSellerReview: async(idSellerReview) => {

	},
	deleteSellerReview: async(idSellerReview) => {

	}
};

module.exports = store;	


    title: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    message: {
        type: DataTypes.FLOAT,
        allowNull: false,