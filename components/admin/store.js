const {Product, User, Seller, Cart} = require('../../db');

const store = {
    getUsers: async function(data){
        let admin = await User.findOne({
            where: {id: data.adminId}
        })
        if(admin.isAdmin){
            let users = await Users.findAll()
            return users
        }else{
            let array = []
            return array
        }
    },
    changePass: async function(data){
        let admin = await User.findOne({
            where: {id: data.adminId}
        })
        if(admin.isAdmin){
            let user = await Users.findOne({
                where:{id:data.userId}
            })
            if(user.superAdmin == false){
                user.password = data.password
                await user.save()
            }
        }
    },
    delUser: async function(data){
        let admin = await User.findOne({
            where: {id: data.adminId}
        })
        if(admin.isAdmin){
        let user = await User.findOne({
            where: {id: data.userId},
            include:{model: Cart},
            include:{model: Seller,
            include:{model: Product}}
        })
        if(user.isAdmin == false && user.superAdmin == false)
        {
        let cart = await Cart.findOne({
            where: {id : user.cart.id}
        })
        if(user.isSeller){
            const seller = await Seller.findOne({
                where: {id: user.seller.id}
            })
            user.seller.products.map(async (e)=>{
                let product = await Product.findOne({
                    where:{id : e.id}
                })
                await product.removeSeller(seller);
                product.visible_lvl_2 = false
                await product.save()
            })
        }
        await user.destroy()
        await cart.destroy()
        }
    }}
    
};


module.exports = store;