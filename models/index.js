const User = require("./user");
const Mamalist = require("./mamalist");
const Babylist = require("./babylist");

User.hasOne(Babylist);
Babylist.belongsTo(User);

User.hasOne(Mamalist);
Mamalist.belongsTo(User);

module.exports = {
  User,
  Mamalist,
  Babylist,
};
