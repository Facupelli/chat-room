require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "./models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Room, Chat_message } = sequelize.models;
// console.log("SEQUELIZE MODEL", sequelize.models);
// Aca vendrian las relaciones

User.hasMany(Room, { as: "roomsOwn" });
Room.belongsTo(User);

User.belongsToMany(Room, { as: "roomsJoined", through: "rooms_users_joined" });
Room.belongsToMany(User, { as: "roomsJoined", through: "rooms_users_joined" });

User.hasMany(Chat_message, { as: "userMessages" });
Chat_message.belongsTo(User);

Room.hasMany(Chat_message, { as: "roomMessages" });
Chat_message.belongsTo(Room);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  Op: Sequelize.Op, // para importart la conexión { conn } = require('./db.js');
};
