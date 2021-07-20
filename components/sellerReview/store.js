const { Seller_review, Seller, User } = require('../../db');

const store = {
	createSellerReview: async(review) => {
		const { idSeller, idUser, title, type, message } = review;

		const seller = Seller.findOne({ where: { id: idSeller}});
		if (!seller)	throw { error: 'No se encuentra el vendedor correspondiente a la id' };

		const user = User.findOne({ where: { id: idUser}});
		if (!user)	throw { error: 'El usuario no es valido'};

		

	},
	getSellerReviews: async(idSeller) => {

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