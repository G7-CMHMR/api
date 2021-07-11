const {Category} = require('../../db');


const store = {
    getAll: async function(){
        let response = await Category.findAll({
            atributes: [
                'title'
            ]});
        return response
        // console.log('En la store de category')
        // return 'des-mutear en category/controller'
    },
    postOne: async function(category_name){
        let response = await Category.create({title: category_name});
        return response
        // console.log('En la store de category')
        // return 'des-mutear en category/controller'
    }
};

module.exports = {store};