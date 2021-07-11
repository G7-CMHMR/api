const {Category} = require('../../db');


const store = {
    getAll: async function(){
        let response = await Category.findAll({
            attributes: [
                'title'
            ]});
        return response.map((el) => el.title)
    },
    postOne: async function(category_name){
        let response = await Category.create({title: category_name});
        return response
    }
};

module.exports = store;