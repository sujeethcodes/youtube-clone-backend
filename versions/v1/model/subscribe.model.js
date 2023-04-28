const Sequelize = require("sequelize");
const DB = require("../model/index");
const Subscribers = DB.define(
  "subscribers",
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
    subscribe: {
      field: "subscribe",
      type: Sequelize.DataTypes.TINYINT,
    },
  },
  {
    timestamps: false,
    table: "Subscribers",
  }
);

module.exports = Subscribers;
