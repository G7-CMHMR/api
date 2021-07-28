const {Seller, Image, Promotion, Category, Save_product_state, Seller_sells, User, Product, Items} = require('../../db');
const { product_attributes} = require('../../aux_functions');

const store = {
	getItems: async function(){
		let response = await Seller_sells.findAll({
			attributes: {exclude: ['createdAt','updatedAt']},
			include:{
				model: Items,
				attributes: ['amount'],
				include: [{model: Product, 
					attributes: product_attributes,
					include: [
						{
							model: Seller,
							attributes: ["id"],
							include: [{
								model: User,
								 attributes: ["name"],
							}]
						},
						{
							model:Image,
							attributes: ["image"],
						},
						{
							model:Category,
							attributes: ["title"],
						},
						{
							model:Promotion,
							attributes: ["value","delivery"],
						}
					],    
				},{
					model: Save_product_state,
					attributes: {exclude: ['createdAt','updatedAt']}
				}],
			}
		});
		return response;
	},
	getSellerItems: async function(data){
		console.log(data)
		let response = await Seller.findOne({
			where:{id: data.id},
			include:{
				model: Seller_sells,
				attributes: {exclude: ['createdAt','updatedAt']},
				include:{
					model: Items,
					attributes: ['amount'],
					include: [{model: Product, 
						attributes: product_attributes,
						include: [
							{
								model: Seller,
								attributes: ["id"],
								include: [{
									model: User,
									 attributes: ["name"],
								}]
							},
							{
								model:Image,
								attributes: ["image"],
							},
							{
								model:Category,
								attributes: ["title"],
							},
							{
								model:Promotion,
								attributes: ["value","delivery"],
							}
						],    
					},{
						model: Save_product_state,
						attributes: {exclude: ['createdAt','updatedAt']},
						include: [
							{
								model:Category,
								attributes: ["title"],
							},
						]
					}],
				}
			}
		})
		return response.seller_sells;
	},
	getSellerItemsFilter: async function(data){
		let response = await this.getSellerItems(data)

		if(data.status){
			response = response.filter((sellerSell) => sellerSell.product_status == data.status);
		}

		if(data.productId){

			response = response.filter((sellerSell) => sellerSell.productId === data.productId);
		}else if(data.category){

			response = response.filter((sellerSell) => {
				if(sellerSell.items.product && sellerSell.items.product.category.includes(data.category))
				{
					return true
				}else if(sellerSell.items.Save_product_state && sellerSell.items.Save_product_state.category.includes(data.category)){
					return true
				}else{
					return false
				}
			});
		}

		return response;
	},
	changeItemStatus: async function(data){
		let response = await Seller_sells.findOne({where: {id: data.sellId},attributes: {exclude: ['createdAt','updatedAt']}});
		response.product_status = data.status;
		response.save();
	}
};

module.exports = store;


