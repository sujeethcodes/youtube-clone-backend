const Sequelize = require("sequelize");
const DB = require("./index");
const User = DB.define(
  "users",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
    },
    userName: {
      field: "userName",
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      field: "email",
      type: Sequelize.DataTypes.STRING,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

module.exports = User;
