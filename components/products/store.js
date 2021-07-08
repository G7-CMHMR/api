
store = {
getAll = async function(){
    await product.findAll({
        includes: [
            'images','category','promotion'
        ],
        atributes: [
            'name','status','price','valuation','stock','brand','description','visible'
        ]});
}
};

export default store