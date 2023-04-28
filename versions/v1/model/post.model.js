const Sequelize = require("sequelize");
const DB = require("./index");
const Creator = require("../model/creator.model");
const PostLikeDisLike = require("./postLikeDislike.model");
const post = DB.define(
  "posts",
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
      type: Sequelize.DataTypes.NUMBER,
    },
    post: {
      field: "post",
      type: Sequelize.DataTypes.STRING,
    },
    postId: {
      field: "postId",
      type: Sequelize.DataTypes.INTEGER,
    },
    compressedPost: {
      field: "compressedPost",
      type: Sequelize.DataTypes.STRING,
    },
    language: {
      field: "language",
      type: Sequelize.DataTypes.STRING,
    },
    categories: {
      field: "categories",
      type: Sequelize.DataTypes.STRING,
    },
    title: {
      field: "title",
      type: Sequelize.DataTypes.STRING,
    },
    description: {
      field: "description",
      type: Sequelize.DataTypes.STRING,
    },
    date: {
      field: "date",
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    tableName: "posts",
  }
);

post.belongsTo(Creator, {
  foreginKey: "creatorId",
  targetKey: "creatorId",
});

post.belongsTo(PostLikeDisLike, {
  foreginKey: "creatorId",
  targetKey: "creatorId",
});

module.exports = post;
