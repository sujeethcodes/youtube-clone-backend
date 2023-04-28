const Sequelize = require("sequelize");
const DB = require("./index");
const postLike = DB.define(
  "postLikes",
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
    postId: {
      field: "postId",
      type: Sequelize.DataTypes.INTEGER,
    },
    likes: {
      field: "likes",
      type: Sequelize.DataTypes.TINYINT,
    },
    disLike: {
      field: "disLike",
      type: Sequelize.DataTypes.TINYINT,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    tableName: "postLikes",
  }
);
module.exports = postLike;
