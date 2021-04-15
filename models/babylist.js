const { DataTypes } = require("sequelize");
const db = require("../db");

const Baby = db.define("babylist", {
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  store: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Baby;
