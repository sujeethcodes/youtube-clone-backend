const Sequelize = require("sequelize");
const DB = require("./index");
const User = require("../model/user.model");
const Creator = DB.define(
  "creators",
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
    creatorId: {
      field: "creatorId",
      type: Sequelize.DataTypes.INTEGER,
    },
    channelName: {
      field: "channelName",
      type: Sequelize.DataTypes.STRING,
    },
    creatorProfile: {
      field: "creatorProfile",
      type: Sequelize.DataTypes.STRING,
    },
    channelId: {
      field: "channelId",
      type: Sequelize.DataTypes.INTEGER,
    },
    channelCategories: {
      field: "channelCategories",
      type: Sequelize.DataTypes.STRING,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    tableName: "creators",
  }
);
Creator.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "userId",
  constraints: false,
});

module.exports = Creator;
