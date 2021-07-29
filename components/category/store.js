const {Category, Type} = require('../../db');


const store = {
    getAll: async function(){
        let response = await Category.findAll({
            where:{visible:true},
            include: [{
                model: Type,
                attributes: [
                    'title'
                ]
            }],
            attributes: [
                'title'
            ]});
        return response.map((el) => ({ title: el.title, types: el.types.map(el => el.title)}))
    },
    postOne: async function(data){
        let response = await Category.create({title: data.category_name})
        data.types && data.types.map(async (type) => {
            await this.addType({category: response.title, type_name: type})
        })
        return response
    },
    addType: async function(data){
        const current_type = await Type.create({title: data.type_name});
        const cat = await Category.findOne({where: {title: data.category}});
        await cat.addType(current_type);
    },
    editCategory: async function(data){
        const cat = await Category.findOne({where: {title: data.category}});
        cat.title = data.newTitle;
        await cat.save();
    },
};

module.exports = store;