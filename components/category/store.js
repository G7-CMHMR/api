const {Category, Type} = require('../../db');


const store = {
    getAll: async function(){
        let response = await Category.findAll({
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
    postOne: async function(category_name){
        console.log(category_name)
        let response = await Category.create({title: category_name.title})
        return response
    }
};

module.exports = store;