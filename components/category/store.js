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
    postOne: async function(category_data){
        console.log(category_data)
        let response = await Category.create({title: category_data.title});
        return response
    }
};

module.exports = store;