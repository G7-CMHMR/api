require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { api,db } = require('./config')
const json_users = require('./jsons_files/json_users')
const json_categories = require('./jsons_files/json_categories')
const json_products = require('./jsons_files/json_products');
const console = require('console');

const sequelize = new Sequelize(`postgres://${db.user}:${db.pass}@${api.host}/compumundo`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades 
// Para relacionarlos hacemos un destructuring
const { Category , Product_review ,Seller_review, Purchase_order , Save_product_state, Seller_sells, Cart , Questions , Type , Image , Product , Promotion, User, Seller, Items } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasOne(Seller);
Seller.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Purchase_order);
Purchase_order.belongsTo(User);

User.hasMany(Seller_review);
Seller_review.belongsTo(User);

User.hasMany(Product_review);
Product_review.belongsTo(User);

Cart.hasMany(Items);
Items.belongsTo(Cart);

Product.hasMany(Items);
Items.belongsTo(Product);

Save_product_state.hasOne(Items);
Items.belongsTo(Save_product_state);

Save_product_state.hasMany(Image);
Image.belongsTo(Save_product_state);

Product.belongsToMany(User , { through: 'Favourite' });
User.belongsToMany(Product , { through: 'Favourite' });

Seller.hasMany(Product);
Product.belongsTo(Seller);

Seller.hasMany(Seller_review);
Seller_review.belongsTo(Seller);

Seller.hasMany(Seller_sells);
Seller_sells.belongsTo(Seller);

Category.hasMany(Type);
Type.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

Product.hasMany(Questions);
Questions.belongsTo(Product);

User.hasMany(Questions);
Questions.belongsTo(User);

Seller.hasMany(Questions);
Questions.belongsTo(Seller);

Items.hasMany(Questions);
Questions.belongsTo(Items);

Product.hasOne(Promotion);
Promotion.belongsTo(Product)

Product.hasMany(Product_review);
Product_review.belongsTo(Product);

Purchase_order.hasMany(Items);
Items.belongsTo(Purchase_order);

Product.belongsToMany(Category , { through: 'Product_Category' });
Category.belongsToMany(Product , { through: 'Product_Category' });

Save_product_state.belongsToMany(Category , { through: 'Save_product_state_Category' });
Category.belongsToMany(Save_product_state , { through: 'Save_product_state_Category' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};