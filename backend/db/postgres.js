const Sequelize = require("sequelize");
const sequelize = new Sequelize("vskiiacg", "vskiiacg", "nXpUrW6-bjSJH6vObqEzlGfozHBZGpiM", {
  host: "hattie.db.elephantsql.com",
  port: "11450",
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user")(sequelize, Sequelize);
db.movies = require("../models/movie")(sequelize, Sequelize);

module.exports = db;