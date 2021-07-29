const {Seller, User, Seller_sells,Category, Save_product_state, Product, Items} = require('../../db');

const store = {
	createSeller: async function(data){
		try {
			const { accountBank, address, commission, location, phone, cuil, id } = data;
			const userRegistered = await User.findOne({ where: { id: id } });
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

			return {
				id: userRegistered.id,
				email: userRegistered.email,
				name: userRegistered.name,
				lastName: userRegistered.lastName,
				phone: userRegistered.phone,
				isSeller: userRegistered.isSeller,
				isGoogleAccount: userRegistered.isGoogleAccount,	
				idSeller: newSeller.id
			};

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

	},
	getInfo: async function(data){
		const seller = await Seller.findOne({
				where: { id: data.sellerId },
				include: [{
					model: Seller_sells,
					include: [{
						model: Items,
						include: [{
							model: Product,
							include: Category
						},{
							model: Save_product_state,
							include: Category
						}],
					}]
				},{
					model: Product,
				}] 
		});
		let ventas = 0;
		seller.seller_sells.forEach((venta)=>{
			ventas = ventas + venta.amount 
		})
		let calificación = seller.reputation;
		let pubicaciones = products.length;
		let ventasCat = {};
		seller.seller_sells.items.forEach((item)=>{
			item.product && ventasCat.product.category.forEach((category)=>{
				ventasCat[category.title] ? (ventasCat[category.title] = 1):(ventasCat[category.title]++);
			})
			item.save_product_state && ventasCat.save_product_state.category.forEach((category)=>{
				ventasCat[category.title] ? (ventasCat[category.title] = 1):(ventasCat[category.title]++);
			})
		})

		let response = {
			ventas: ventas,
			calificación: calificación,
			pubicaciones: pubicaciones,
			ventasCat: ventasCat,
		}

		return response;
	}
};

module.exports = store;


