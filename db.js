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
const { Category , Image , Product , Promotion, User, Seller } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasOne(Seller);
Seller.belongsTo(User);

Seller.hasMany(Product);
Product.belongsTo(Seller);


Product.hasMany(Image);
Image.belongsTo(Product);

Product.hasOne(Promotion);
Promotion.belongsTo(Product)

Product.belongsToMany(Category , { through: 'Product_Category' });
Category.belongsToMany(Product , { through: 'Product_Category' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};