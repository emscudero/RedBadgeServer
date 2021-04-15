const { Sequelize } = require("sequelize");

const db = new Sequelize("Mamabearsden", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

// const User = require("./models/user");
// const Mamalist = require("./models/mamalist");
// const Babylist = require("./models/babylist");
// User(sequelize);
// Mamalist(sequelize);
// Babylist(sequelize);
// const { user, mamalist, babylist } = sequelize.models;

// user.hasOne(babylist);
// babylist.belongsTo(user);

// user.hasOne(mamalist);
// mamalist.belongsTo(user);
// sequelize.authenticate().then(
//   function () {
//     console.log("Connected to Mamabearsden postgres database");
//   },
//   function (err) {
//     console.log(err);
//   }
// );
module.exports = db;
