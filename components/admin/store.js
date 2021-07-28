const {Product, User, Seller, Cart} = require('../../db');

const store = {
    getUsers: async function(data){
        let admin = await User.findOne({
            where: {id: data.adminId}
        })
        if(admin.superAdmin){
            let users = await Users.findAll()
            return users
        }
        else if(admin.isAdmin){
            let users = await Users.findAll({
                where:{superAdmin: false,
                    isAdmin: false}
            })
            return users
        }else{
            let array = []
            return array
        }
    },
    becomeUser: async function(data){
        let admin = await User.findOne({
            where:{id : data.adminId}
        })
        if(admin.superAdmin){
            let user = await Users.findOne({
                where:{id: data.userId}
            })
            user.isAdmin = true
            await user.save()
        }
    },
    makeReview: async function(data){
        let admin = await User.findOne({
            where:{id : data.adminId}
        })
        if(admin.isAdmin || admin.superAdmin){
            let product = await Product.findOne({
                where:{id: data.productId}
            })
            product.valuation = data.valuation
            product.save()
        }
    },
    getAllPC: async function(data){
        let admin = await User.findOne({
            where:{id : data.adminId}
        })
        if(admin.isAdmin || admin.superAdmin){
            let pc = await Category.findAll({
                where:{title: 'PC'},
                include:{model: Product,
                    where:{valide: false},
                    attributes: {exclude: ['createdAt','updatedAt']},
            }
            })
            return pc
        }
    },
    changePass: async function(data){
        let admin = await User.findOne({
            where: {id: data.adminId}
        })
        if(admin.superAdmin){
            let user = await Users.findOne({
                where:{id:data.userId}
            })
            user.password = data.password
            await user.save()
        }
        else if(admin.isAdmin){
            let user = await Users.findOne({
                where:{id:data.userId}
            })
            if(user.superAdmin == false && user.isAdmin == false ){
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