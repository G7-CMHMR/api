const {Seller, User} = require('../../db');

const store = {
	createSeller: async function(userId, data){
		try {
			const { accountBank, address, commission, location, phone, cuil } = data;
			const userRegistered = await User.findOne({ where: { id: userId } });
		    if (!userRegistered)   throw { error: 'El usuario no existe' };
		    if (userRegistered.isSeller)	throw { error: 'El usuario ya es vendedor'};

		    const date = new Date();

		    const newSeller = await Seller.create({
		    	accountBank: accountBank,
		    	address: address,
		    	creation_date: date,
		    	commission: commission,
		    	location: location,
		    	phone: phone,
		    	cuil: cuil
		    });

			const isNewSellerCreated = Object.keys(newSeller).length > 0;
			if (!isNewSellerCreated)   throw { error: 'Error al crear el vendedor' };

			userRegistered.isSeller = true;
			userRegistered.save();
			newSeller.setUser(userRegistered);

			return newSeller;

	    } catch (error) {
	        throw error;
	    }
	},
	getSeller: async function(userId){
		try{
			const sellerRegistered = await Seller.findOne({	where: { userId: userId } });

			if (!sellerRegistered)	throw { error: 'El vendedor no existe'};

			return sellerRegistered;
		} catch(error){
			throw error;
		}
	},
	updateSeller: async function(userId, data){

	}
};

module.exports = store;


