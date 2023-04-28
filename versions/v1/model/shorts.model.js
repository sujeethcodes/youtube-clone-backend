const Sequelize = require("sequelize");
const DB = require("../model/index");
const Creator = require("../model/creator.model");
const Shrots = DB.define(
  "Shrots",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    creatorId: {
      field: "creatorId",
      type: Sequelize.DataTypes.INTEGER,
    },
    shorts: {
      field: "shorts",
      type: Sequelize.DataTypes.STRING,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    tableName: "Shorts",
  }
);

Shrots.belongsTo(Creator, {
  foreignKey: "creatorId",
  targetKey: "creatorId",
});

module.exports = Shrots;
