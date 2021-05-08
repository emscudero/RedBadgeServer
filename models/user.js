const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  // first_name: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },

  // last_name: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },

  // number_of_children: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  // },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
